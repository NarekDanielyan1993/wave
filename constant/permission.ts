import { UppercaseKeys, UserPermissionResourcesTypes } from 'types';

export const PERMISSION_ACTION = {
    READ: 'read',
    CREATE: 'create',
    UPDATE: 'update',
    DELETE: 'delete',
    READ_OWN: 'read_own',
};

export const PERMISSION_RESOURCES: UppercaseKeys<UserPermissionResourcesTypes> =
    {
        PROFILE: 'profile',
        ADMINPAGE: 'adminPage',
        PRODUCT: 'product',
    };
