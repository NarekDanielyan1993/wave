import { USER_API } from '@constant/api';
import { PayloadAction } from '@reduxjs/toolkit';
import { apiRequest } from '@utils/apiRequest';
import { call, put, takeLatest } from 'redux-saga/effects';
import {
    GetUserProfilePayloadType,
    UpdateUserEmailPayloadType,
    UpdateUserPayloadType,
    type AddToCartPayloadType,
    type GetCartsPayloadType,
    type RemoveCartPayloadType,
} from 'types';
import {
    ADD_TO_CART,
    GET_CART,
    GET_USER_PROFILE,
    REMOVE_CART,
    UPDATE_USER,
    UPDATE_USER_EMAIL,
} from './action';
import {
    addToCartSuccess,
    getCartsSuccess,
    getUserInit,
    getUserSuccess,
    isUserEmailLoading,
    isUserLoading,
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
        console.log(data);
        yield put(getCartsSuccess(data));
    } catch (error) {
        console.log(error);
    }
}

function* addToCartGenerator(action: PayloadAction<AddToCartPayloadType>) {
    yield put(isUserLoading(true));
    try {
        const { data } = yield call(apiRequest.post, USER_API.ADD_TO_CART, {
            ...action.payload,
        });
        yield put(addToCartSuccess(data));
    } catch (error) {
        console.log(error);
    }
    yield put(isUserLoading(true));
}

function* removeCartGenerator(action: PayloadAction<RemoveCartPayloadType>) {
    const { id } = action.payload;
    try {
        const { data } = yield call(apiRequest.delete, USER_API.REMOVE_CART, {
            params: { id },
        });
        console.log(data);
        yield put(removeCartSuccess(id));
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
    yield takeLatest(GET_CART, getCartsGenerator);
    yield takeLatest(REMOVE_CART, removeCartGenerator);
}
