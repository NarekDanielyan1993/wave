import { UserProfileValidationTypes } from 'common/validation/user';
import {
    AddToHistoryActionTypes,
    AddToHistoryPayloadType,
    GetHistoryActionTypes,
    GetHistoryPayloadType,
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
export const ADD_TO_HISTORY = 'ADD_TO_HISTORY';
export const GET_CART = 'GET_CART';
export const GET_HISTORY = 'GET_HISTORY';
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
    console.log(data);
    return {
        type: ADD_TO_CART,
        payload: data,
    };
}

export function addToHistory(
    data: AddToHistoryPayloadType[]
): AddToHistoryActionTypes {
    return {
        type: ADD_TO_HISTORY,
        payload: data,
    };
}

export function getHistory(data: GetHistoryPayloadType): GetHistoryActionTypes {
    return {
        type: GET_HISTORY,
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
