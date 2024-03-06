import { USER_PERMISSIONS_API } from '@constant/api';
import { PayloadAction } from '@reduxjs/toolkit';
import { showNotification } from '@store/notification/reducer';
import { apiRequest } from '@utils/apiRequest';
import { call, put, takeLatest } from 'redux-saga/effects';
import { GetUserPermissionsPayloadType } from 'types';
import { GET_USER_PERMISSIONS } from './action';
import { getUserPermissionsSuccess } from './reducer';

function* getUserPermissionsGenerator(
    action: PayloadAction<GetUserPermissionsPayloadType>
) {
    try {
        const { role } = action.payload;
        const { data } = yield call(
            apiRequest.post,
            USER_PERMISSIONS_API.GET_USER_PERMISSIONS,
            {
                role,
            }
        );
        yield put(getUserPermissionsSuccess(data));
    } catch (error: any) {
        yield put(
            showNotification({
                message: error?.response?.data?.msg,
                type: 'error',
            })
        );
    }
}

export function* watchUserPermissionSaga() {
    yield takeLatest(GET_USER_PERMISSIONS, getUserPermissionsGenerator);
}
