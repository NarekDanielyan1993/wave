import mongoose, { Document, Model } from 'mongoose';

export interface IUserPermission extends Document {
    resource: string;
    role_id: mongoose.Schema.Types.ObjectId;
    permission_id: mongoose.Schema.Types.ObjectId;
}

export interface IUserPermissionService {
    getPermissionsByRoleAndResource(
        roles: mongoose.Schema.Types.ObjectId[],
        resource: string
    ): Promise<IUserPermission[]>;
}

export type UserPermissionModel = Model<IUserPermission>;
