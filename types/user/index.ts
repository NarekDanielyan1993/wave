import { Prisma, UserRole } from '@prisma/client';
import { AuthSignUpTypes } from 'common/validation/auth';
import { SESSION_PROVIDERS } from 'constant/auth';
import { UppercaseKeys } from 'types/common';
import { Keys } from 'types/database';
import type { IProductResponse } from 'types/product';

export interface IUserRole {
    name: string;
}

export interface Account {
    userId: string;
    type: (typeof SESSION_PROVIDERS)[keyof typeof SESSION_PROVIDERS];
    provider: (typeof SESSION_PROVIDERS)[keyof typeof SESSION_PROVIDERS];
    providerAccountId: string;
    refresh_token?: string;
    access_token?: string;
    expires_at?: number;
    token_type?: string;
    scope?: string;
    id_token?: string;
    session_state?: string;
}
export interface IUser {
    email: string;
    firstName: string;
    lastName: string;
    url: string | null;
    publicId: string | null;
    withProvider?: boolean;
}

export interface IUserProfile {
    firstName?: string;
    lastName?: string;
    url?: string;
    publicId?: string;
}

export interface IUserResponse extends IUser {
    id: string;
    role: UserRole;
    createdAt: Date;
    updatedAt: Date;
}

export interface ICartsResponse {
    id: string;
    userId: string;
    productId: string;
    product: IProductResponse;
}

export interface ICartsResponseClient {
    id: string;
    userId: string;
    productId: string;
}

export interface ICarts extends Omit<ICartsResponse, 'product' | 'productId'> {
    products: IProductCart[];
    subtotal: number;
    quantity: number;
}

export interface IProductCart extends IProductResponse {
    total: number;
    quantity: number;
    cartId: string;
}

export interface IHistoryResponse {
    userId: string;
    amount: number;
    product: string;
}

export interface ICart {
    userId: string;
    productId: string;
}

export interface IHistory {
    userId: string;
    product: string;
    amount: number;
}

export type UserGetQueryParams = {
    id: string;
};

export type CartCreateBody = {
    userId: string;
    productId: string;
};

export type CartDeleteBody = {
    product: IProductCart;
};

export type ProfileEmailUpdateBody = {
    email: string;
};

export interface IProfileHistoryCreateBody {
    userId: string;
    product: string;
    amount: number;
}

export type IProfileHistoryGetQueryParams = {
    userId: string;
};

export type ProfileImageDeleteBody = {
    publicId: string;
};
export interface IUserResponseWIthPassword extends IUserResponse {
    password: string;
}

export type IUserModelFields = UppercaseKeys<Keys<'User'>>;

export type IUserModelDefaultSortByField = Record<
    'User',
    Extract<Keys<'User'>, 'firstname'>
>;

export interface IUserService {
    verifyEmail: (id: string) => Promise<IUserResponse>;
    getByEmail: (email: string) => Promise<IUserResponse | null>;
    getById(id: string): Promise<IUserResponse | null>;
    createUser: (user: AuthSignUpTypes) => Promise<IUserResponse>;
    updateById(
        id: string,
        userData: Prisma.UserUpdateInput
    ): Promise<IUserResponse>;
    addToCart: (cart: ICart) => Promise<ICart>;
    addToHistory(history: IHistory[]): Promise<Prisma.BatchPayload>;
    getHistory(userId: string): Promise<IHistory[] | null>;
    removeCart(id: string): Promise<Prisma.BatchPayload>;
    removeCarts(ids: string[]): Promise<Prisma.BatchPayload>;
    getCarts: (userId: string) => Promise<ICartsResponseClient[] | null>;
    verifyPassword: (
        currentPassword: string,
        password: string
    ) => Promise<boolean>;
    hashPassword: (password: string) => Promise<string>;
    getProfile: (email: string) => Promise<IUserResponse | null>;
    updateUserProfile: (
        email: string,
        fields: IUserProfile
    ) => Promise<IUserResponse>;
    isEmailTaken: (email: string) => Promise<boolean>;
    updateUserEmail: (
        email: string,
        oldEmail: string
    ) => Promise<IUserResponse>;
    generateToken: (id: string, email: string, expiresIn: number) => string;
}
