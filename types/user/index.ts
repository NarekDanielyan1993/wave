import { UserRole } from '@prisma/client';
import { AuthTypes } from 'common/validation/auth';
import { SESSION_PROVIDERS } from 'constant/auth';
import { UppercaseKeys } from 'types/common';
import { Keys } from 'types/database';
import type { IProductResponse } from 'types/product';

// export enum UserRole {
//     ADMIN,
//     USER,
// }

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
    firstname: string;
    lastname: string;
    url: string;
    publicId: string;
    history: object;
    cart: object;
}

export interface IUserProfile {
    firstname?: string;
    lastname?: string;
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
    email: string;
};

export type CartCreateBody = {
    userId: string;
    productId: string;
};

export type CartDeleteBody = {
    ids: string[];
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
    createUser: (user: AuthTypes) => Promise<IUserResponse>;
    addToCart: ({ id, productId }: ICart) => Promise<ICart>;
    addToHistory(history: IHistory[]): Promise<IHistory>;
    getHistory(userId: string): Promise<IHistory[] | null>;
    removeCart: (id: string[]) => Promise<ICart>;
    getCarts: (userId: string) => Promise<ICartsResponse[] | null>;
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
    generateToken: (id: string) => string;
}
