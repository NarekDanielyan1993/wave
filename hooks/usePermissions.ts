import { useAppSelector } from '@store/create-store';
import { userPermissionsSelector } from '@store/userPermission/selectors';
import {
    UserPermissionActionsTypes,
    UserPermissionResourcesTypes,
} from 'types';

export const usePermissions = (
    resource: UserPermissionResourcesTypes
): UserPermissionActionsTypes => {
    const permissions = useAppSelector(userPermissionsSelector);
    return permissions?.userPermissions[resource];
};

export default usePermissions;
