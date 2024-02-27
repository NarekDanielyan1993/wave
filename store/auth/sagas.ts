import { AUTH_API } from '@constant/api';
import { NOTIFICATION_MESSAGES } from '@constant/notification';
import { PayloadAction } from '@reduxjs/toolkit';
import { showNotification } from '@store/notification/reducer';
import { apiRequest } from '@utils/apiRequest';
import { config } from '@utils/config';
import { AuthTypes } from 'common/validation/auth';
import { signIn } from 'next-auth/react';
import Router from 'next/router';
import { call, put, takeLatest } from 'redux-saga/effects';
import { AUTH_SIGN_UP, createAuthSignInPromise } from './action';
import { isAuthLoading } from './reducer';

function* signUpGenerator(action: PayloadAction<AuthTypes>) {
    const { email, password } = action.payload;
    try {
        yield put(isAuthLoading(true));
        yield call(apiRequest.post, AUTH_API.SIGN_UP, {
            email,
            password,
        });
        yield put(
            showNotification({
                message: NOTIFICATION_MESSAGES.SUCCESS.SIGN_UP,
                type: 'success',
            })
        );
        yield put(isAuthLoading(false));
    } catch (error) {
        console.log(error);
        yield put(isAuthLoading(false));
    }
}

function* signInGenerator(
    action: typeof createAuthSignInPromise.types.triggerAction
) {
    const { email, password } = action.payload;
    yield put(isAuthLoading(true));
    try {
        const data = yield call(signIn, 'credentials', {
            // callbackUrl: '/',
            email,
            password,
            redirect: false,
        });
        Router.push(config.NEXT_PUBLIC_BASE_URL);
    } catch (error) {
        console.log(error);
    }
    yield put(isAuthLoading(false));
}

export function* watchAuthSaga() {
    yield takeLatest(AUTH_SIGN_UP, signUpGenerator);
    yield takeLatest(createAuthSignInPromise, signInGenerator);
}
