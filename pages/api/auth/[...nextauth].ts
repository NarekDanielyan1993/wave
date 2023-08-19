import { ForbiddenError, ValidationError } from '@lib/classes';
import User from '@lib/classes/models/user';
import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import {
    AuthData,
    authValidationSchema,
    validateAuthData,
} from './auth.validator';

import { USER_ERROR_TYPES } from '@constant/error';
import { config, connectDB } from 'lib';
import NextAuth from 'next-auth';

export const authOptions: NextAuthOptions = {
    session: {
        strategy: 'jwt',
        maxAge: 30 * 24 * 60 * 60,
        updateAge: 24 * 60 * 60,
    },
    jwt: {
        secret: config.NEXTAUTH_SECRET,
    },
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {},
            async authorize(credentials: AuthData | undefined) {
                const { email, password } = credentials;
                const isError = await validateAuthData(authValidationSchema, {
                    email,
                    password,
                });

                if (isError) {
                    throw new ForbiddenError(
                        USER_ERROR_TYPES.INVALID_CREDENTIALS.msg
                    );
                }

                await connectDB();

                const currentUser = await User.getByEmail(email);
                if (!currentUser) {
                    throw new ForbiddenError(
                        USER_ERROR_TYPES.USER_NOT_FOUND.msg,
                        USER_ERROR_TYPES.USER_NOT_FOUND.status
                    );
                }
                const isValid = await currentUser.verifyPassword(password);
                if (!isValid) {
                    throw new ValidationError(
                        USER_ERROR_TYPES.WRONG_PASSWORD.msg,
                        USER_ERROR_TYPES.USER_NOT_FOUND.status
                    );
                }

                return {
                    user: {
                        email: currentUser.email,
                        role: currentUser.role,
                    },
                } as any;
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
    pages: {
        signIn: '/auth',
        signOut: '/auth',
        error: undefined,
        verifyRequest: undefined,
        newUser: undefined,
    },
};
export default NextAuth(authOptions);
