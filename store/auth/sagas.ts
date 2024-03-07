import { AUTH_API } from '@constant/api';
import { NOTIFICATION_MESSAGES } from '@constant/notification';
import { SHOP_ROUTE } from '@constant/route';
import { PayloadAction } from '@reduxjs/toolkit';
import { showNotification } from '@store/notification/reducer';
import { apiRequest } from '@utils/apiRequest';
import { AuthSignUpTypes } from 'common/validation/auth';
import { signIn } from 'next-auth/react';
import Router from 'next/router';
import { call, put, takeLatest } from 'redux-saga/effects';
import { AUTH_SIGN_UP, createAuthSignInPromise } from './action';
import { isAuthLoading } from './reducer';

function* signUpGenerator(action: PayloadAction<AuthSignUpTypes>) {
    try {
        yield put(isAuthLoading(true));
        yield call(apiRequest.post, AUTH_API.SIGN_UP, {
            ...action.payload,
        });
        yield put(
            showNotification({
                message: NOTIFICATION_MESSAGES.SUCCESS.SIGN_UP,
                type: 'success',
            })
        );
    } catch (error: any) {
        yield put(
            showNotification({
                message: error?.response?.data?.msg,
                type: 'error',
            })
        );
    }
    yield put(isAuthLoading(false));
}

function* signInGenerator(
    action: typeof createAuthSignInPromise.types.triggerAction
) {
    const { email, password } = action.payload;
    yield put(isAuthLoading(true));
    try {
        const data = yield call(signIn, 'credentials', {
            email,
            password,
            redirect: false,
        });
        if (data.error) {
            yield put(
                showNotification({
                    message: data.error,
                    type: 'error',
                })
            );
        } else {
            Router.push(SHOP_ROUTE);
        }
    } catch (error) {
        console.log(error);
    }
    yield put(isAuthLoading(false));
}

export function* watchAuthSaga() {
    yield takeLatest(AUTH_SIGN_UP, signUpGenerator);
    yield takeLatest(createAuthSignInPromise, signInGenerator);
}
