import { AuthData } from '@api/auth/auth.validator';
import mongoose, { Model } from 'mongoose';

export enum UserRole {
    Admin = 'admin',
    User = 'user',
}

export interface IUserRole {
    action: string;
}

export type RoleModel = Model<IUserRole>;

export interface IUser extends Document {
    email: string;
    password: string;
    roles?: mongoose.Schema.Types.ObjectId[];
    firstname?: string;
    lastname?: string;
    verified?: boolean;
    history?: object;
    cart?: object;
}

export interface IUserService {
    getByEmail: (email: string) => Promise<IUser | null>;
    createUser: (user: AuthData) => Promise<IUser>;
    verifyPassword: (user: IUser, password: string) => Promise<boolean>;
    hashPassword: (password: string) => Promise<string>;
    getProfile: (email) => Promise<Partial<IUser>> | null;
}

export type UserModel = Model<IUser>;
