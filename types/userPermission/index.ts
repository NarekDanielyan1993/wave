import { UserRole } from '@prisma/client';
import { GET_USER_PERMISSIONS } from '@store/userPermission/action';

export type UserPermissions = Record<
    UserPermissionResourcesTypes,
    UserPermissionActionsTypes
>;

export type UserPermissionActionTypesUnion =
    | 'read'
    | 'update'
    | 'delete'
    | 'create';

export type UserPermissionActionsTypes = {
    read: boolean;
    create: boolean;
    update: boolean;
    delete: boolean;
};

export type UserPermissionResourcesTypes = 'adminPage' | 'profile' | 'product';

export type GET_USER_PERMISSIONS_TYPES = typeof GET_USER_PERMISSIONS;

export type GetUserPermissionActionTypes = {
    type: GET_USER_PERMISSIONS_TYPES;
    payload: GetUserPermissionsPayloadType;
};

export type GetUserPermissionsPayloadType = {
    role: UserRole;
};

export type GetUserPermissionsQueryBody = {
    role: UserRole;
};

export type UserPermissionsResponseTypes = {
    resource: UserPermissionResourcesTypes;
    actions: UserPermissionActionTypesUnion[];
};

export interface IUserPermissionService {
    getPermissions(role: UserRole): Promise<UserPermissionsResponseTypes[]>;
    getPermissionsByResource: (
        role: UserRole,
        resource: UserPermissionResourcesTypes
    ) => Promise<UserPermissionsResponseTypes>;
}
