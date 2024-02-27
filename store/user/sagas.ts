import { USER_API } from '@constant/api';
import { PayloadAction } from '@reduxjs/toolkit';
import { apiRequest } from '@utils/apiRequest';
import { call, put, takeLatest } from 'redux-saga/effects';
import {
    AddToHistoryPayloadType,
    GetHistoryPayloadType,
    GetUserProfilePayloadType,
    IDeleteProfileImagePayload,
    UpdateUserEmailPayloadType,
    UpdateUserPayloadType,
    type AddToCartPayloadType,
    type GetCartsPayloadType,
    type RemoveCartPayloadType,
} from 'types';
import {
    ADD_PROFILE_IMAGE,
    ADD_TO_CART,
    ADD_TO_HISTORY,
    DELETE_PROFILE_IMAGE,
    GET_CART,
    GET_HISTORY,
    GET_USER_PROFILE,
    REMOVE_CART,
    UPDATE_USER,
    UPDATE_USER_EMAIL,
} from './action';
import {
    addProfileImageSuccess,
    addToCartSuccess,
    deleteProfileImageSuccess,
    getCartsSuccess,
    getHistorySuccess,
    getUserInit,
    getUserSuccess,
    isCartLoading,
    isUserEmailLoading,
    isUserLoading,
    isUserProfileImageDeleteLoading,
    isUserProfileImageLoading,
    removeCartSuccess,
    updateUserEmailSuccess,
    updateUserSuccess,
} from './reducer';

function* getUserProfileGenerator(
    action: PayloadAction<GetUserProfilePayloadType>
) {
    const { email } = action.payload;
    yield put(getUserInit());
    try {
        const { data } = yield call(apiRequest.get, USER_API.GET_USER, {
            params: { email },
        });
        yield put(getUserSuccess(data));
    } catch (error) {
        console.log(error);
    }
}

function* getCartsGenerator(action: PayloadAction<GetCartsPayloadType>) {
    const { id } = action.payload;
    try {
        const { data } = yield call(apiRequest.get, USER_API.GET_CARTS, {
            params: { userId: id },
        });
        yield put(getCartsSuccess(data));
    } catch (error) {
        console.log(error);
    }
}

function* addToCartGenerator(action: PayloadAction<AddToCartPayloadType>) {
    yield put(isCartLoading(true));
    try {
        const { data } = yield call(apiRequest.post, USER_API.ADD_TO_CART, {
            ...action.payload,
        });
        yield put(addToCartSuccess(data));
    } catch (error) {
        console.log(error);
    }
    yield put(isCartLoading(false));
}

function* addProfileImageGenerator(
    action: PayloadAction<AddToCartPayloadType>
) {
    yield put(isUserProfileImageLoading(true));
    try {
        const { data } = yield call(
            apiRequest.put,
            USER_API.ADD_PROFILE_IMAGE,
            {
                ...action.payload,
            }
        );
        yield put(addProfileImageSuccess(data));
    } catch (error) {
        console.log(error);
    }
    yield put(isUserProfileImageLoading(false));
}

function* deleteProfileImageGenerator(
    action: PayloadAction<IDeleteProfileImagePayload>
) {
    yield put(isUserProfileImageDeleteLoading(true));
    try {
        const { data } = yield call(
            apiRequest.delete,
            USER_API.DELETE_PROFILE_IMAGE,
            {
                data: { params: { ...action.payload } },
            }
        );
        yield put(deleteProfileImageSuccess(data));
    } catch (error) {
        console.log(error);
    }
    yield put(isUserProfileImageDeleteLoading(false));
}

function* removeCartGenerator(action: PayloadAction<RemoveCartPayloadType>) {
    const { id } = action.payload;
    yield put(isCartLoading(true));
    try {
        const { data } = yield call(apiRequest.delete, USER_API.REMOVE_CART, {
            data: { ids: id },
        });
        yield put(removeCartSuccess({ quantity: data, id: id }));
    } catch (error) {
        console.log(error);
    }
    yield put(isCartLoading(false));
}

function* addToHistoryGenerator(
    action: PayloadAction<AddToHistoryPayloadType>
) {
    try {
        const { data } = yield call(apiRequest.post, USER_API.ADD_TO_HISTORY, {
            history: action.payload,
        });
        console.log(data);
        // yield put(removeCartSuccess(id));
    } catch (error) {
        console.log(error);
    }
}

function* getHistoryGenerator(action: PayloadAction<GetHistoryPayloadType>) {
    const { id } = action.payload;
    try {
        const { data } = yield call(apiRequest.get, USER_API.GET_HISTORY, {
            params: { userId: id },
        });
        console.log(data);
        yield put(getHistorySuccess(data));
    } catch (error) {
        console.log(error);
    }
}

function* updateUserEmailGenerator(
    action: PayloadAction<UpdateUserEmailPayloadType>
) {
    const { email } = action.payload;
    yield put(isUserEmailLoading(true));
    try {
        const { data } = yield call(
            apiRequest.put,
            USER_API.UPDATE_USER_EMAIL,
            {
                email,
            }
        );
        yield put(updateUserEmailSuccess(data));
    } catch (error) {
        console.log(error);
    }
    yield put(isUserEmailLoading(false));
}

function* updateUserGenerator(action: PayloadAction<UpdateUserPayloadType>) {
    const userData = action.payload;
    yield put(isUserLoading(true));
    try {
        const { data } = yield call(apiRequest.put, USER_API.UPDATE_USER, {
            ...userData,
        });
        yield put(updateUserSuccess(data));
    } catch (error) {
        console.log(error);
    }
    yield put(isUserLoading(false));
}

export function* watchUserSaga() {
    yield takeLatest(GET_USER_PROFILE, getUserProfileGenerator);
    yield takeLatest(UPDATE_USER_EMAIL, updateUserEmailGenerator);
    yield takeLatest(UPDATE_USER, updateUserGenerator);
    yield takeLatest(ADD_TO_CART, addToCartGenerator);
    yield takeLatest(ADD_PROFILE_IMAGE, addProfileImageGenerator);
    yield takeLatest(DELETE_PROFILE_IMAGE, deleteProfileImageGenerator);
    yield takeLatest(GET_CART, getCartsGenerator);
    yield takeLatest(REMOVE_CART, removeCartGenerator);
    yield takeLatest(ADD_TO_HISTORY, addToHistoryGenerator);
    yield takeLatest(GET_HISTORY, getHistoryGenerator);
}
