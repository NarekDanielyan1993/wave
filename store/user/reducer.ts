import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import {
    IUserResponse,
    SingleUserState,
    type AddToCartPayloadType,
    type ICartsResponse,
} from 'types';
import { usersReducerName } from './action';

interface IUsersState {
    isLoading: boolean;
    isEmailLoading: boolean;
    user: SingleUserState;
    cart: AddToCartPayloadType[];
}

const initialState: IUsersState = {
    isLoading: false,
    isEmailLoading: false,
    cart: [],
    user: {
        isLoading: false,
        data: {} as IUserResponse,
        isFetched: false,
    },
};

const userSlice = createSlice({
    name: usersReducerName,
    initialState,
    reducers: {
        getUserInit: (state: IUsersState) => {
            state.user.data = {} as IUserResponse;
            state.user.isLoading = true;
            state.user.isFetched = false;
        },
        addToCartSuccess: (
            state: IUsersState,
            action: PayloadAction<AddToCartPayloadType>
        ) => {
            state.cart = [...state.cart, action.payload];
        },
        getCartsSuccess: (
            state: IUsersState,
            action: PayloadAction<ICartsResponse>
        ) => {
            state.cart = action.payload;
        },
        removeCartSuccess: (
            state: IUsersState,
            action: PayloadAction<string>
        ) => {
            state.cart = state.cart.filter(cart => cart.id !== action.payload);
        },
        isUserLoading: (state: IUsersState, action: PayloadAction<boolean>) => {
            state.user.isLoading = action.payload;
        },
        isUserEmailLoading: (
            state: IUsersState,
            action: PayloadAction<boolean>
        ) => {
            state.isEmailLoading = action.payload;
        },
        getUserSuccess: (
            state: IUsersState,
            action: PayloadAction<IUserResponse>
        ) => {
            state.user.data = action.payload;
            state.user.isLoading = false;
            state.user.isFetched = true;
        },
        updateUserSuccess: (
            state: IUsersState,
            action: PayloadAction<IUserResponse>
        ) => {
            state.user.data = { ...state.user.data, ...action.payload };
        },
        updateUserEmailSuccess: (
            state: IUsersState,
            action: PayloadAction<IUserResponse>
        ) => {
            state.user.data = { ...state.user.data, ...action.payload };
        },
    },
});

export const {
    getUserInit,
    addToCartSuccess,
    getCartsSuccess,
    removeCartSuccess,
    getUserSuccess,
    isUserLoading,
    updateUserEmailSuccess,
    updateUserSuccess,
    isUserEmailLoading,
} = userSlice.actions;

export default userSlice.reducer;
