import {
    AUTH_ENCRYPTION_LENGTH,
    JWT_TOKEN_EXPIRATION_TIME,
} from '@constant/auth';
import { USER_ERROR_TYPES } from '@constant/error';
import prismaAdapter from '@lib/db';
import { PrismaClient, UserRole } from '@prisma/client';
import { ForbiddenError, NotFoundError } from '@utils/error-handler';
import { compare, hashSync } from 'bcryptjs';
import jwt from 'jsonwebtoken';

import { DATABASE_MODELS, USER_MODEL_FIELDS } from '@constant/db';
import { config } from '@utils/config';
import { AuthTypes } from 'common/validation/auth';
import {
    IUserProfile,
    IUserResponse,
    IUserResponseWIthPassword,
    IUserService,
    type ICart,
    type ICartsResponse,
} from 'types';
import { prismaExclude } from 'types/database';

class UserService implements IUserService {
    private prisma: PrismaClient;

    constructor(prisma: PrismaClient = prismaAdapter) {
        this.prisma = prisma;
    }

    async getByEmail(email: string): Promise<IUserResponse | null> {
        return await this.prisma.user.findUnique({
            where: {
                email,
            },
            select: prismaExclude(DATABASE_MODELS.USER, [
                USER_MODEL_FIELDS.PASSWORD,
            ]),
        });
    }

    async getAllData(email: string): Promise<IUserResponseWIthPassword | null> {
        return await this.prisma.user.findUnique({
            where: {
                email,
            },
        });
    }

    async createUser({ password, email }: AuthTypes): Promise<IUserResponse> {
        const hashedPassword = await this.hashPassword(password);

        const user = await this.prisma.user.create({
            data: {
                password: hashedPassword,
                email,
                role: UserRole.USER,
            },
        });

        return user;
    }

    async addToCart({ userId, productId }: ICart): Promise<ICart> {
        const user = await this.prisma.cart.create({
            data: {
                userId,
                productId,
            },
        });

        return user;
    }

    async removeCart(id: string): Promise<ICart> {
        const user = await this.prisma.cart.delete({
            where: {
                id,
            },
        });

        return user;
    }

    async getCarts(userId: string): Promise<ICartsResponse[] | null> {
        return await this.prisma.cart.findMany({
            where: {
                userId,
            },
            include: {
                product: true,
            },
        });
    }

    async updateUserProfile(
        email: string,
        userData: IUserProfile
    ): Promise<IUserResponse> {
        console.log(userData);
        const updatedUser = await this.prisma.user.update({
            where: {
                email,
            },
            data: {
                ...userData,
            },
            select: prismaExclude('User', ['password']),
        });
        console.log(updatedUser);

        if (!updatedUser) {
            throw new NotFoundError(
                USER_ERROR_TYPES.USER_NOT_FOUND.msg,
                USER_ERROR_TYPES.USER_NOT_FOUND.status
            );
        }

        return updatedUser;
    }

    async isEmailTaken(email: string): Promise<boolean> {
        const user = await this.prisma.user.findUnique({
            where: {
                email,
            },
        });
        return !!user;
    }

    generateToken = (id: string) => {
        const token = jwt.sign({ id }, config.NEXTAUTH_SECRET, {
            expiresIn: JWT_TOKEN_EXPIRATION_TIME,
        });
        return token;
    };

    async verifyEmail(id: string): Promise<IUserResponse> {
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
                    verified: false,
                },
                select: prismaExclude('User', ['password']),
            });

            if (!updatedUser) {
                throw new NotFoundError(
                    USER_ERROR_TYPES.USER_NOT_FOUND.msg,
                    USER_ERROR_TYPES.USER_NOT_FOUND.status
                );
            }

            return updatedUser;
        } catch (error) {
            throw error;
        }
    }

    async getProfile(email: string): Promise<IUserResponse | null> {
        const user = await this.prisma.user.findUnique({
            where: {
                email,
            },
            select: prismaExclude('User', ['password']),
        });

        return user;
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
