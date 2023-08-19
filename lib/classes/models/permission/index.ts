import mongoose, { Schema, models } from 'mongoose';
import { IPermission } from 'types';

const permissionSchema = new Schema<IPermission>({
    action: {
        type: String,
        required: true,
    },
});

const Permission =
    models.Permission ||
    mongoose.model<IPermission>('Permission', permissionSchema);

export default Permission;
