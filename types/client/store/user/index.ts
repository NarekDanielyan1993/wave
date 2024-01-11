import {
    ADD_TO_CART,
    GET_CART,
    GET_USER_PROFILE,
    REMOVE_CART,
    UPDATE_USER,
    UPDATE_USER_EMAIL,
} from '@store/user/action';
import { UserProfileValidationTypes } from 'common/validation/user';
import { IUser, IUserResponse } from 'types/user';

export type GET_USER_PROFILE_TYPE = typeof GET_USER_PROFILE;
export type UPDATE_USER_EMAIL_TYPE = typeof UPDATE_USER_EMAIL;
export type UPDATE_USER_TYPE = typeof UPDATE_USER;
export type ADD_TO_CART_TYPE = typeof ADD_TO_CART;
export type GET_CART_TYPE = typeof GET_CART;
export type REMOVE_CART_TYPE = typeof REMOVE_CART;

export type GetUserProfilesActionTypes = {
    type: GET_USER_PROFILE_TYPE;
    payload: GetUserProfilePayloadType;
};

export type GetUserProfilePayloadType = {
    email: string;
};

export type AddToCartActionTypes = {
    type: ADD_TO_CART_TYPE;
    payload: AddToCartPayloadType;
};

export type AddToCartPayloadType = {
    productId: string;
    userId: string;
};

export type GetCartsActionTypes = {
    type: GET_CART_TYPE;
    payload: GetCartsPayloadType;
};

export type GetCartsPayloadType = {
    id: string;
};

export type RemoveCartActionTypes = {
    type: REMOVE_CART_TYPE;
    payload: RemoveCartPayloadType;
};

export type RemoveCartPayloadType = {
    id: string;
};

export type UpdateUserPayloadType = {
    userData: Pick<IUser, 'firstname' | 'lastname'>;
};

export type UpdateUserProfileActionTypes = {
    type: UPDATE_USER_TYPE;
    payload: UserProfileValidationTypes;
};

export type UpdateUserEmailPayloadType = {
    email: string;
};

export type UpdateUserEmailActionTypes = {
    type: UPDATE_USER_EMAIL_TYPE;
    payload: UpdateUserEmailPayloadType;
};

export type SingleUserState = {
    isLoading: boolean;
    isFetched: boolean;
    data: IUserResponse;
};
