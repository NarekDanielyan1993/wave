import { USER_PERMISSIONS_DEFAULT } from '@constant/default';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import {
    UserPermissionActionsTypes,
    UserPermissionResourcesTypes,
    UserPermissions,
    UserPermissionsResponseTypes,
} from 'types';
import { usersPermissionsReducerName } from './action';

interface IUserPermissionsState {
    isLoading: boolean;
    userPermissions: UserPermissions;
}

const initialState: IUserPermissionsState = {
    isLoading: false,
    userPermissions: {} as UserPermissions,
};

const userPermissionsSlice = createSlice({
    name: usersPermissionsReducerName,
    initialState,
    reducers: {
        getUserPermissionsSuccess: (
            state: IUserPermissionsState,
            action: PayloadAction<UserPermissionsResponseTypes[]>
        ) => {
            console.log(action.payload);
            state.userPermissions = action.payload.reduce(
                (permissions, permission: UserPermissionsResponseTypes) => {
                    const resource: UserPermissionResourcesTypes =
                        permission.resource;
                    const actions: UserPermissionActionsTypes = {
                        ...USER_PERMISSIONS_DEFAULT,
                    };

                    permission.actions.forEach(action => {
                        actions[action] = true;
                    });

                    permissions[resource] = actions;
                    return permissions;
                },
                {} as UserPermissions
            );
        },
    },
});

export const { getUserPermissionsSuccess } = userPermissionsSlice.actions;

export default userPermissionsSlice.reducer;
