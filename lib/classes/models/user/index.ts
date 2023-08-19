import mongoose, { Schema, model, models } from 'mongoose';
import { IUser, UserModel } from 'types';

const userSchema: Schema<IUser> = new Schema({
    email: {
        type: String,
        unique: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
    },
    roles: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Role',
        },
    ],
    firstname: {
        type: String,
        trim: true,
        default: '',
    },
    lastname: {
        type: String,
        trim: true,
        default: '',
    },
    verified: {
        type: Boolean,
        default: false,
    },
    history: {
        type: Array,
        default: [],
    },
    cart: {
        type: Array,
        default: [],
    },
});

const User: UserModel = models.User || model<IUser>('User', userSchema);

export default User;
