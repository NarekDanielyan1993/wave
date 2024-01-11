import { promiseActionFactory } from '@teroneko/redux-saga-promise';
import { AuthTypes } from 'common/validation/auth';
import { SignUpActionTypes } from 'types/client/store/auth';
export const AUTH_SIGN_UP = 'AUTH_SIGN_UP';
export const AUTH_SIGN_IN = 'AUTH_SIGN_IN';
export const createAuthSignInPromise =
    promiseActionFactory<void>().create<AuthTypes>(AUTH_SIGN_IN);

export const ProductsReducerName = 'products';

export function signUp(data: AuthTypes): SignUpActionTypes {
    return {
        type: AUTH_SIGN_UP,
        payload: data,
    };
}

// export function signIn(data: AuthTypes): SignInActionTypes {
//     return {
//         type: AUTH_SIGN_IN,
//         payload: data,
//     };
// }
