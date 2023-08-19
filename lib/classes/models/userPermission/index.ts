import mongoose, { Schema, models } from 'mongoose';
import { IUserPermission, UserPermissionModel } from 'types';

const userPermissionSchema: Schema<IUserPermission> =
    new Schema<IUserPermission>({
        resource: {
            type: String,
            required: true,
        },
        role_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Role',
            required: true,
        },
        permission_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Permission',
            required: true,
        },
    });

const UserPermission: UserPermissionModel =
    models.UserPermission ||
    mongoose.model<IUserPermission>('UserPermission', userPermissionSchema);

export default UserPermission;
