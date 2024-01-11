import { UppercaseKeys, UserPermissionResourcesTypes } from 'types';

export const PERMISSION_ACTION = {
    READ: 'read',
    CREATE: 'create',
    UPDATE: 'update',
    DELETE: 'delete',
};

export const PERMISSION_RESOURCES: UppercaseKeys<UserPermissionResourcesTypes> =
    {
        PROFILE: 'profile',
        ADMINPAGE: 'adminPage',
    };
