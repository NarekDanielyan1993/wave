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
} from '@store/user/action';
import { IProductCart, IUser, IUserResponse } from 'types/user';

export type GET_USER_PROFILE_TYPE = typeof GET_USER_PROFILE;
export type UPDATE_USER_EMAIL_TYPE = typeof UPDATE_USER_EMAIL;
export type UPDATE_USER_TYPE = typeof UPDATE_USER;
export type ADD_TO_CART_TYPE = typeof ADD_TO_CART;
export type ADD_PROFILE_IMAGE_TYPE = typeof ADD_PROFILE_IMAGE;
export type DELETE_PROFILE_IMAGE_TYPE = typeof DELETE_PROFILE_IMAGE;
export type ADD_TO_HISTORY_TYPE = typeof ADD_TO_HISTORY;
export type GET_CART_TYPE = typeof GET_CART;
export type GET_HISTORY_TYPE = typeof GET_HISTORY;
export type REMOVE_CART_TYPE = typeof REMOVE_CART;

export type GetUserProfilesActionTypes = {
    type: GET_USER_PROFILE_TYPE;
    payload: GetUserProfilePayloadType;
};

export type GetUserProfilePayloadType = {
    id: string;
};

export type AddToCartActionTypes = {
    type: ADD_TO_CART_TYPE;
    payload: AddToCartPayloadType;
};

export type AddToCartPayloadType = {
    productId: string;
    userId: string;
};

export interface IAddProfileImageAction {
    type: ADD_PROFILE_IMAGE_TYPE;
    payload: IAddProfileImagePayload;
}

export interface IAddProfileImagePayload {
    file: File;
}

export interface IDeleteProfileImageAction {
    type: DELETE_PROFILE_IMAGE_TYPE;
    payload: IDeleteProfileImagePayload;
}

export interface IDeleteProfileImagePayload {
    publicId: string;
}

export type AddToHistoryActionTypes = {
    type: ADD_TO_HISTORY_TYPE;
    payload: AddToHistoryPayloadType[];
};

export type AddToHistoryPayloadType = {
    product: string;
    userId: string;
    amount: number;
};

export type GetCartsActionTypes = {
    type: GET_CART_TYPE;
    payload: GetCartsPayloadType;
};

export type GetCartsPayloadType = {
    id: string;
};

export type GetHistoryActionTypes = {
    type: GET_HISTORY_TYPE;
    payload: GetHistoryPayloadType;
};

export type GetHistoryPayloadType = {
    id: string;
};

export type RemoveCartActionTypes = {
    type: REMOVE_CART_TYPE;
    payload: RemoveCartPayloadType;
};

export type RemoveCartPayloadType = {
    product: IProductCart;
};

export type UpdateUserPayloadType = {
    userData: Pick<IUser, 'firstName' | 'lastName'>;
};

export interface IUpdateUserProfilePayload {
    firstName: string;
    lastName: string;
    file?: string;
}

export interface IUpdateUserProfileAction {
    type: UPDATE_USER_TYPE;
    payload: IUpdateUserProfilePayload;
}

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
