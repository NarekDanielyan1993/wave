import {
    AUTH_ENCRYPTION_LENGTH,
    JWT_TOKEN_EXPIRATION_TIME,
} from '@constant/auth';
import { USER_ERROR_TYPES } from '@constant/error';
import prismaAdapter from '@lib/db';
import { Prisma, PrismaClient } from '@prisma/client';
import { ForbiddenError, InternalServerError } from '@utils/error-handler';
import { compare, hashSync } from 'bcryptjs';
import jwt from 'jsonwebtoken';

import { DATABASE_MODELS, USER_MODEL_FIELDS } from '@constant/db';
import { config } from '@utils/config';
import { AuthSignUpTypes } from 'common/validation/auth';
import {
    ICartsResponseClient,
    IHistory,
    IUserResponse,
    IUserResponseWIthPassword,
    IUserService,
    type ICart,
} from 'types';
import { prismaExclude } from 'types/database';

class UserService implements IUserService {
    private prisma: PrismaClient;

    constructor(prisma: PrismaClient = prismaAdapter) {
        this.prisma = prisma;
    }

    async getByEmail(email: string): Promise<IUserResponse | null> {
        try {
            return await this.prisma.user.findUnique({
                where: {
                    email,
                },
                select: prismaExclude(DATABASE_MODELS.USER, [
                    USER_MODEL_FIELDS.PASSWORD,
                ]),
            });
        } catch (error) {
            throw new InternalServerError();
        }
    }

    async getById(id: string): Promise<IUserResponse | null> {
        try {
            return await this.prisma.user.findFirst({
                where: {
                    id,
                },
                select: prismaExclude(DATABASE_MODELS.USER, [
                    USER_MODEL_FIELDS.PASSWORD,
                ]),
            });
        } catch (error) {
            throw new InternalServerError();
        }
    }

    async getAllData(email: string): Promise<IUserResponseWIthPassword | null> {
        try {
            return await this.prisma.user.findFirst({
                where: {
                    email: {
                        contains: email,
                        mode: 'insensitive',
                    },
                },
            });
        } catch (error) {
            throw new InternalServerError('Failed to get user.');
        }
    }

    async createUser({
        password,
        email,
        firstName,
        lastName,
    }: AuthSignUpTypes): Promise<IUserResponse> {
        try {
            const hashedPassword = await this.hashPassword(password);

            const user = await this.prisma.user.create({
                data: {
                    password: hashedPassword,
                    email,
                    firstName,
                    lastName,
                },
            });

            return user;
        } catch (error) {
            throw new InternalServerError('Failed to create user.');
        }
    }

    async updateById(
        id: string,
        userData: Prisma.UserUpdateInput
    ): Promise<IUserResponse> {
        try {
            const updatedUser = await this.prisma.user.update({
                where: {
                    id,
                },
                data: {
                    ...userData,
                },
                select: prismaExclude('User', ['password']),
            });
            return updatedUser;
        } catch (error) {
            throw new InternalServerError('Failed to update profile.');
        }
    }

    async getProfile(email: string): Promise<IUserResponse | null> {
        try {
            const user = await this.prisma.user.findUnique({
                where: {
                    email,
                },
                select: prismaExclude('User', ['password']),
            });
            return user;
        } catch (error) {
            throw new ForbiddenError('Failed to get profile.');
        }
    }

    async updateUserProfile(
        email: string,
        userData: Prisma.UserUpdateInput
    ): Promise<IUserResponse> {
        try {
            const updatedUser = await this.prisma.user.update({
                where: {
                    email,
                },
                data: {
                    ...userData,
                },
                select: prismaExclude('User', ['password']),
            });
            return updatedUser;
        } catch (error) {
            throw new InternalServerError('Failed to update profile.');
        }
    }

    async updateUserEmail(
        newEmail: string,
        oldEmail: string
    ): Promise<IUserResponse> {
        try {
            if (await this.isEmailTaken(newEmail)) {
                throw new ForbiddenError(
                    USER_ERROR_TYPES.EMAIL_EXISTS.msg,
                    USER_ERROR_TYPES.EMAIL_EXISTS.status
                );
            }
            const updatedUser = await this.prisma.user.update({
                where: {
                    email: oldEmail,
                },
                data: {
                    email: newEmail,
                },
                select: prismaExclude('User', ['password']),
            });

            return updatedUser;
        } catch (error) {
            throw new InternalServerError('Failed to update user email.');
        }
    }

    async isEmailTaken(email: string): Promise<boolean> {
        const user = await this.prisma.user.findUnique({
            where: {
                email,
            },
        });
        return !!user;
    }

    generateToken = (id: string, email?: string, expiresIn?: number) => {
        try {
            const token = jwt.sign(
                { id, email },
                config.NEXTAUTH_SECRET as string,
                {
                    expiresIn: expiresIn || JWT_TOKEN_EXPIRATION_TIME,
                }
            );
            return token;
        } catch (error) {
            throw new InternalServerError();
        }
    };

    async verifyEmail(id: string): Promise<IUserResponse> {
        try {
            const updatedUser = await this.prisma.user.update({
                where: {
                    id,
                },
                data: {
                    verified: true,
                    emailVerified: new Date(),
                },
                select: prismaExclude('User', ['password']),
            });
            return updatedUser;
        } catch (error) {
            throw new InternalServerError();
        }
    }

    async addToCart({ userId, productId }: ICart): Promise<ICart> {
        try {
            const cart = await this.prisma.cart.create({
                data: {
                    userId,
                    productId,
                },
                include: {
                    product: true,
                },
            });
            return cart;
        } catch (error) {
            throw new InternalServerError('Failed to add to cart.');
        }
    }

    async addToHistory(history: IHistory[]): Promise<Prisma.BatchPayload> {
        try {
            const historyData = await this.prisma.history.createMany({
                data: history,
            });
            return historyData;
        } catch (error) {
            throw new InternalServerError('Failed to add to the history.');
        }
    }

    async getHistory(userId: string): Promise<IHistory[] | null> {
        try {
            const history = await this.prisma.history.findMany({
                where: {
                    userId,
                },
            });
            return history;
        } catch (error) {
            throw new InternalServerError('Failed to get histories.');
        }
    }

    async removeCart(id: string[]): Promise<Prisma.BatchPayload> {
        try {
            const user = await this.prisma.cart.deleteMany({
                where: {
                    productId: { in: id },
                },
            });
            return user;
        } catch (error) {
            throw new InternalServerError('Failed to remove cart.');
        }
    }

    async getCarts(userId: string): Promise<ICartsResponseClient[] | null> {
        try {
            const carts = await this.prisma.cart.findMany({
                where: {
                    userId,
                },
                include: {
                    product: true,
                },
            });
            return carts;
        } catch (error) {
            throw new InternalServerError('Failed to get carts.');
        }
    }

    async verifyPassword(
        currentPassword: string,
        password: string
    ): Promise<boolean> {
        const result = await compare(password, currentPassword);
        return result;
    }

    async hashPassword(password: string): Promise<string> {
        return hashSync(password, AUTH_ENCRYPTION_LENGTH);
    }
}

export default UserService;
