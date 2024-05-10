import { AuthSignInTypes, AuthSignUpTypes } from '@common/validation/auth';
import { promiseActionFactory } from '@teroneko/redux-saga-promise';
import { SignUpActionTypes } from 'types/client/store/auth';
export const AUTH_SIGN_UP = 'AUTH_SIGN_UP';
export const AUTH_SIGN_IN = 'AUTH_SIGN_IN';

export const createAuthSignInPromise =
    promiseActionFactory<void>().create<AuthSignInTypes>(AUTH_SIGN_IN);

export const AuthReducerName = 'auth';

export function signUp(data: AuthSignUpTypes): SignUpActionTypes {
    return {
        type: AUTH_SIGN_UP,
        payload: data,
    };
}
