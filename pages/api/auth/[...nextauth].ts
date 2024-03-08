import { PrismaAdapter } from '@auth/prisma-adapter';
import {
    AUTH_SESSION_OPTIONS_SERVER,
    SESSION_PROVIDERS_TYPES,
} from '@constant/auth';
import { USER_ERROR_TYPES } from '@constant/error';
import prismaAdapter from '@lib/db';
import UserService from '@lib/services/user';
import {
    AuthSignInTypes,
    authSignInValidationSchema,
} from 'common/validation/auth';
import { IncomingMessage, ServerResponse } from 'http';
import { config } from 'lib';
import { NextApiRequest, NextApiResponse } from 'next';
import type { Session, User } from 'next-auth';
import NextAuth, { Account, getServerSession } from 'next-auth';
import type { Adapter } from 'next-auth/adapters';
import { type JWT } from 'next-auth/jwt';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import type { IUserResponse, IUserResponseWIthPassword } from 'types';
import { validateAuthData } from './auth.validator';

export const adapter = PrismaAdapter(prismaAdapter) as Adapter;

export const authOptions = {
    session: {
        ...AUTH_SESSION_OPTIONS_SERVER,
    },
    debug: config.isDev,
    secret: config.NEXTAUTH_SECRET,
    logger: {
        error(code: any, metadata: any) {
            console.log({ type: 'inside error logger', code, metadata });
        },
        warn(code: any) {
            console.log({ type: 'inside warn logger', code });
        },
        debug(code: any, metadata: any) {
            console.log({ type: 'inside debug logger', code, metadata });
        },
    },
    adapter,
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {},
            async authorize({ email, password }: AuthSignInTypes) {
                const isError = await validateAuthData(
                    authSignInValidationSchema,
                    {
                        email,
                        password,
                    }
                );

                if (isError) {
                    throw new Error(USER_ERROR_TYPES.INVALID_CREDENTIALS.msg);
                }
                const userService = new UserService();
                const currentUser: IUserResponseWIthPassword | null =
                    await userService.getAllData(email);
                if (!currentUser || (currentUser && currentUser.withProvider)) {
                    throw new Error(USER_ERROR_TYPES.USER_NOT_FOUND.msg);
                }
                const isValid = await userService.verifyPassword(
                    currentUser.password,
                    password
                );
                if (!isValid) {
                    throw new Error(USER_ERROR_TYPES.WRONG_PASSWORD.msg);
                }
                const userAuth: User = {
                    id: currentUser.id,
                    email: currentUser.email,
                    role: currentUser.role,
                    isProvider: false,
                };
                return userAuth;
            },
        }),
        GoogleProvider({
            clientId: config.GOOGLE_CLIENT_ID,
            clientSecret: config.GOOGLE_CLIENT_SECRET,
            authorization: {
                params: {
                    prompt: 'consent',
                    access_type: 'offline',
                    response_type: 'code',
                },
            },
        }),
    ],
    callbacks: {
        async signIn({
            user,
            account,
            profile,
        }: {
            user: any;
            account: any;
            profile?: any;
        }) {
            if (account?.provider === 'google' && profile) {
                const userService = new UserService();
                let userData: IUserResponse | null =
                    await userService.getAllData(profile.email as string);
                if (!userData) {
                    const { email } = profile;
                    userData = await userService.createUser!({
                        email: email as string,
                        withProvider: true,
                        password: account?.providerAccountId as string,
                        firstName: profile.given_name,
                        lastName: profile.family_name,
                    });
                }
                const userAccount = await adapter.getUserByAccount!({
                    provider: 'google',
                    providerAccountId: profile.sub as string,
                });
                if (!userAccount && userData) {
                    await adapter.linkAccount!({
                        userId: userData.id,
                        provider: account.provider,
                        providerAccountId: profile.sub as string,
                        type: 'oauth',
                    });
                }
            }
            return true;
        },
        async jwt({
            user,
            token,
            account,
        }: {
            user: User;
            token: JWT;
            account: Account | null;
        }) {
            if (user) {
                token = {
                    ...token,
                    user: {
                        id: user.id,
                        email: user.email,
                        role: user.role,
                        isProvider:
                            user.isProvider ??
                            !!(account?.type === SESSION_PROVIDERS_TYPES.OAUTH),
                    },
                };
            }
            return token;
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
                    email: token.user.email,
                    id: token.user.id,
                    role: token.user.role,
                    isProvider: token.user.isProvider,
                } as User,
            } as Session;
            return session;
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

export default NextAuth(authOptions);
export const getAuth = async (
    req:
        | NextApiRequest
        | (IncomingMessage & { cookies: Partial<{ [key: string]: string }> }),
    res: NextApiResponse | ServerResponse
) => await getServerSession(req, res, authOptions);
