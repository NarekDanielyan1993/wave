import { AUTH_ENCRYPTION_LENGTH } from '@constant/auth';
import { USER_ERROR_TYPES } from '@constant/error';
import { NotFoundError } from '@lib/classes';
import Role from '@lib/classes/models/role';
import User from '@lib/classes/models/user';
import { compare, hashSync } from 'bcryptjs';
import { IUser, IUserService, RoleModel, UserModel } from 'types';

class UserService implements IUserService {
    private userModel: UserModel;
    private roleModel: RoleModel;

    constructor(UserModel: UserModel = User, RoleModel: RoleModel = Role) {
        this.userModel = UserModel;
        this.roleModel = RoleModel;
    }

    async getByEmail(email: string): Promise<IUser> {
        return await this.userModel.findOne({ email });
    }

    async createUser({ password, email }): Promise<IUser> {
        const hashedPassword = await this.hashPassword(password);
        return this.userModel.create({
            password: hashedPassword,
            email,
        });
    }

    async getProfile(email): Promise<Partial<IUser>> {
        const user = await this.userModel
            .findOne({ email })
            .select('-password')
            .populate('roles');

        if (!user) {
            throw new NotFoundError(
                USER_ERROR_TYPES.USER_NOT_FOUND.msg,
                USER_ERROR_TYPES.USER_NOT_FOUND.status
            );
        }
        return user;
    }

    async verifyPassword(user, password) {
        const result = await compare(password, user.password);
        return result;
    }

    async hashPassword(password) {
        return hashSync(password, AUTH_ENCRYPTION_LENGTH);
    }
}

export default UserService;
