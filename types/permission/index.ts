import { Model } from 'mongoose';

export interface IPermission extends Document {
    name: string;
    action: string;
}
export type PermissionModel = Model<IPermission>;
