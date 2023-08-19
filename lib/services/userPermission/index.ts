import MongoDb from '@lib/classes/database';
import UserPermission from '@lib/classes/models/userPermission';
import mongoose from 'mongoose';
import {
    IUserPermission,
    IUserPermissionService,
    UserPermissionModel,
} from 'types';
import IDbConnection from 'types/database';

class UserPermissionService implements IUserPermissionService {
    private userPermissionModel: UserPermissionModel;
    private dbConnection: IDbConnection;

    constructor(
        userPermissionModel: UserPermissionModel = UserPermission,
        dbConnection: IDbConnection = new MongoDb()
    ) {
        this.userPermissionModel = userPermissionModel;
        this.dbConnection = dbConnection;
    }

    async getPermissionsByRoleAndResource(
        roles: mongoose.Schema.Types.ObjectId[],
        resource: string
    ): Promise<IUserPermission[]> {
        const userPermissionActions = await UserPermission.find({
            role_id: { $in: roles },
            resource,
        }).populate('permissions');

        return userPermissionActions;
    }
}

export default UserPermissionService;
