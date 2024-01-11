import { PERMISSION_ACTION, PERMISSION_RESOURCES } from '@constant/permission';

export type PermissionOptions = {
    resource: (typeof PERMISSION_RESOURCES)[keyof typeof PERMISSION_RESOURCES];
    permissions: (typeof PERMISSION_ACTION)[keyof typeof PERMISSION_ACTION][];
};

export interface IPermission {
    action: string;
}
