import { AUTH_SIGN_IN, AUTH_SIGN_UP } from '@store/auth/action';
import { AuthTypes } from 'common/validation/auth';

export type AUTH_SIGN_UP = typeof AUTH_SIGN_UP;
export type AUTH_SIGN_IN = typeof AUTH_SIGN_IN;

export type SingUpActionPayload = AuthTypes;

export type SignUpActionTypes = {
    type: AUTH_SIGN_UP;
    payload: SingUpActionPayload;
};

export type SignInActionTypes = {
    type: AUTH_SIGN_IN;
    payload: SingUpActionPayload;
};
