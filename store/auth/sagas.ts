import { AuthSignUpTypes } from '@common/validation/auth';
import { AUTH_API } from '@constant/api';
import { NOTIFICATION_MESSAGES } from '@constant/notification';
import { PayloadAction } from '@reduxjs/toolkit';
import { isAuthLoading } from '@store/auth/reducer';
import { showNotification } from '@store/notification/notificationReducer';
import { implementPromiseAction } from '@teroneko/redux-saga-promise';
import { apiRequest } from '@utils/apiRequest';
import { signIn } from 'next-auth/react';
import { call, put, takeLatest } from 'redux-saga/effects';
import { AUTH_SIGN_UP, createAuthSignInPromise } from './action';

export function* signUpGenerator(action: PayloadAction<AuthSignUpTypes>) {
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
        console.log(error);
        yield put(
            showNotification({
                message: error?.response?.data?.msg,
                type: 'error',
            })
        );
    }
    yield put(isAuthLoading(false));
}

// export function* signInGenerator(
//     action: typeof createAuthSignInPromise.types.triggerAction
// ) {
//     const { email, password } = action.payload;
//     yield put(isAuthLoading(true));
//     try {
//         const data = yield call(signIn, 'credentials', {
//             email,
//             password,
//             redirect: false,
//         });
//         console.log(data);

//         if (data.error) {
//             yield put(
//                 showNotification({
//                     message: data.error,
//                     type: 'error',
//                 })
//             );
//         } else {
//             return Promise.resolve('success');
//         }
//     } catch (error) {
//         console.log(error);
//     }
//     yield put(isAuthLoading(false));
// }

function* signInGenerator(
    action: typeof createAuthSignInPromise.types.triggerAction
) {
    yield call(implementPromiseAction, action, function* () {
        const { email, password } = action.payload;
        yield put(isAuthLoading(true));
        try {
            const data = yield call(signIn, 'credentials', {
                email,
                password,
                redirect: false,
            });
            console.log(data);

            if (data.error) {
                yield put(isAuthLoading(false));
                yield put(
                    showNotification({
                        message: data.error,
                        type: 'error',
                    })
                );
            } else {
                yield put(isAuthLoading(false));
                return Promise.resolve('success');
            }
        } catch (error) {
            console.log(error);
        }
    });
}

export function* watchAuthSaga() {
    yield takeLatest(AUTH_SIGN_UP, signUpGenerator);
    yield takeLatest(createAuthSignInPromise, signInGenerator);
}
