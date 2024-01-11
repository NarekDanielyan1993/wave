import { UserProfileValidationTypes } from 'common/validation/user';
import {
    GetUserProfilePayloadType,
    GetUserProfilesActionTypes,
    UpdateUserEmailActionTypes,
    UpdateUserProfileActionTypes,
    type AddToCartActionTypes,
    type AddToCartPayloadType,
    type GetCartsActionTypes,
    type GetCartsPayloadType,
    type RemoveCartActionTypes,
    type RemoveCartPayloadType,
} from 'types';
export const GET_USER_PROFILE = 'GET_USER_PROFILE';
export const UPDATE_USER_EMAIL = 'UPDATE_USER_EMAIL';
export const UPDATE_USER = 'UPDATE_USER';
export const ADD_TO_CART = 'ADD_TO_CART';
export const GET_CART = 'GET_CART';
export const REMOVE_CART = 'REMOVE_CART';

export const usersReducerName = 'users';

export function getUser(
    data: GetUserProfilePayloadType
): GetUserProfilesActionTypes {
    return {
        type: GET_USER_PROFILE,
        payload: data,
    };
}

export function getCarts(data: GetCartsPayloadType): GetCartsActionTypes {
    return {
        type: GET_CART,
        payload: data,
    };
}

export function addToCart(data: AddToCartPayloadType): AddToCartActionTypes {
    return {
        type: ADD_TO_CART,
        payload: data,
    };
}

export function removeCart(data: RemoveCartPayloadType): RemoveCartActionTypes {
    return {
        type: REMOVE_CART,
        payload: data,
    };
}

export function updateUserProfile(
    data: UserProfileValidationTypes
): UpdateUserProfileActionTypes {
    return {
        type: UPDATE_USER,
        payload: data,
    };
}

export function updateUserEmail(
    data: GetUserProfilePayloadType
): UpdateUserEmailActionTypes {
    return {
        type: UPDATE_USER_EMAIL,
        payload: data,
    };
}
