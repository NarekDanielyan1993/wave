import {
    GetUserPermissionActionTypes,
    GetUserPermissionsPayloadType,
} from 'types';

export const GET_USER_PERMISSIONS = 'GET_USER_PERMISSIONS';

export const usersPermissionsReducerName = 'userPermissions';

export function getUserPermissions(
    data: GetUserPermissionsPayloadType
): GetUserPermissionActionTypes {
    return {
        type: GET_USER_PERMISSIONS,
        payload: data,
    };
}
