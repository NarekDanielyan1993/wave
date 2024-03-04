import { PrismaAdapter } from '@auth/prisma-adapter';
import { AUTH_SESSION_OPTIONS_SERVER } from '@constant/auth';
import { USER_ERROR_TYPES } from '@constant/error';
import prismaAdapter from '@lib/db';
import UserService from '@lib/services/user';
import { ForbiddenError, ValidationError } from '@utils/error-handler';
import { createExpiryFromDate } from '@utils/helper';
import { authValidationSchema, type AuthTypes } from 'common/validation/auth';
import Cookies from 'cookies';
import { config } from 'lib';
import type { NextApiRequest, NextApiResponse } from 'next';
import type { AuthOptions, Session, User } from 'next-auth';
import NextAuth from 'next-auth';
import type { Adapter } from 'next-auth/adapters';
import { decode, encode, type JWT } from 'next-auth/jwt';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import type { IUserResponseWIthPassword } from 'types';
import { validateAuthData } from './auth.validator';

// Define a function to generate authOptions with access to req and res
export const authOptions = (
    req: NextApiRequest,
    res: NextApiResponse
): AuthOptions => {
    const adapter = PrismaAdapter(prismaAdapter) as Adapter;

    return {
        session: {
            ...AUTH_SESSION_OPTIONS_SERVER,
        },
        debug: config.isDev,
        secret: config.NEXTAUTH_SECRET,
        logger: {
            error(code, metadata) {
                console.log({ type: 'inside error logger', code, metadata });
            },
            warn(code) {
                console.log({ type: 'inside warn logger', code });
            },
            debug(code, metadata) {
                console.log({ type: 'inside debug logger', code, metadata });
            },
        },
        jwt: {
            encode: async ({ token, secret, maxAge }) => {
                if (
                    req.query &&
                    req.query.nextauth &&
                    req.query.nextauth.includes('callback') &&
                    req.query.nextauth.includes('credentials') &&
                    req.method === 'POST'
                ) {
                    const cookies = new Cookies(req, res);
                    const cookie = cookies.get('next-auth.session-token');

                    if (cookie) {
                        return cookie;
                    }
                    return '';
                }
                return encode({ token, secret, maxAge });
            },
            decode: async ({ token, secret }) => {
                if (
                    req.query &&
                    req.query.nextauth &&
                    req.query.nextauth.includes('callback') &&
                    req.query.nextauth.includes('credentials') &&
                    req.method === 'POST'
                ) {
                    return null;
                }

                return decode({ token, secret });
            },
        },
        adapter,
        providers: [
            CredentialsProvider({
                name: 'Credentials',
                credentials: {},
                async authorize({ email, password }: AuthTypes) {
                    const isError = await validateAuthData(
                        authValidationSchema,
                        {
                            email,
                            password,
                        }
                    );

                    if (isError) {
                        throw new ForbiddenError(
                            USER_ERROR_TYPES.INVALID_CREDENTIALS.msg
                        );
                    }

                    const userService = new UserService();
                    const currentUser: IUserResponseWIthPassword | null =
                        await userService.getAllData(email);
                    if (!currentUser) {
                        throw new ForbiddenError(
                            USER_ERROR_TYPES.USER_NOT_FOUND.msg,
                            USER_ERROR_TYPES.USER_NOT_FOUND.status
                        );
                    }
                    const isValid = await userService.verifyPassword(
                        currentUser.password,
                        password
                    );
                    if (!isValid) {
                        throw new ValidationError(
                            USER_ERROR_TYPES.WRONG_PASSWORD.msg,
                            USER_ERROR_TYPES.USER_NOT_FOUND.status
                        );
                    }
                    const userAuth: User = {
                        id: currentUser.id,
                        email: currentUser.email,
                        role: currentUser.role,
                    };
                    return userAuth;
                },
            }),
            GoogleProvider({
                clientId: config.GOOGLE_CLIENT_ID,
                clientSecret: config.GOOGLE_CLIENT_SECRET,
            }),
        ],
        callbacks: {
            async signIn({ user, account, profile, email, credentials }) {
                if (
                    req.query &&
                    req.query.nextauth &&
                    req.query.nextauth.includes('callback') &&
                    req.query.nextauth.includes('credentials') &&
                    req.method === 'POST'
                ) {
                    if (user) {
                        const sessionToken = await encode({
                            token: {
                                user: {
                                    email: user.email,
                                    id: user.id,
                                    role: user.role,
                                } as User,
                            } as JWT,
                            secret: config.NEXTAUTH_SECRET,
                        });
                        const sessionExpiry = createExpiryFromDate(
                            AUTH_SESSION_OPTIONS_SERVER.maxAge
                        );
                        await adapter.createSession({
                            sessionToken,
                            userId: user.id,
                            expires: sessionExpiry,
                        });
                        const cookies = new Cookies(req, res);
                        cookies.set('next-auth.session-token', sessionToken, {
                            expires: sessionExpiry,
                        });
                    }
                }

                return true;
            },
            async session({
                session,
                token,
                user,
            }: {
                session: Session;
                token: JWT;
                user: User;
            }) {
                session = {
                    ...session,
                    user: {
                        email: user.email,
                        id: user.id,
                        role: user.role,
                    } as User,
                } as Session;
                return Promise.resolve(session);
            },
            async jwt({ user, token }: { user: User; token: JWT }) {
                if (user) {
                    token = {
                        ...token,
                        user: {
                            id: user.id,
                            email: user.email,
                            role: user.role,
                        },
                    };
                }
                return token;
            },
        },
        pages: {
            signIn: '/auth',
            signOut: '/auth',
            error: undefined,
            verifyRequest: undefined,
            newUser: undefined,
        },
    };
};

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const options = authOptions(req, res);

    return await NextAuth(req, res, options);
}
