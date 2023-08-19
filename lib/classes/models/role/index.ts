import { Schema, model, models } from 'mongoose';
import { IUserRole, RoleModel } from 'types';

const roleSchema: Schema<IUserRole> = new Schema({
    action: {
        type: String,
        trim: true,
    },
});

const Role: RoleModel = models.Role || model<IUserRole>('Role', roleSchema);

export default Role;
