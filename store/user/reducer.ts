import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import {
    ICarts,
    ICartsResponse,
    IHistoryResponse,
    IProductCart,
    IUserResponse,
    SingleUserState,
} from 'types';
import { usersReducerName } from './action';

interface IUsersState {
    isLoading: boolean;
    isEmailLoading: boolean;
    user: SingleUserState;
    isCartLoading: boolean;
    isUserProfileImageLoading: boolean;
    isUserProfileImageDeleteLoading: boolean;
    cart: ICarts;
    history: IHistoryResponse[];
}

const initialState: IUsersState = {
    isLoading: false,
    isEmailLoading: false,
    cart: {
        id: '',
        subtotal: 0,
        userId: '',
        products: [],
        quantity: 0,
    } as ICarts,
    user: {
        isLoading: false,
        data: {} as IUserResponse,
        isFetched: false,
    },
    isCartLoading: false,
    isUserProfileImageLoading: false,
    isUserProfileImageDeleteLoading: false,
    history: [],
};

const userSlice = createSlice({
    name: usersReducerName,
    initialState,
    reducers: {
        getUserInit: (state: IUsersState) => {
            state.user.data = {} as IUserResponse;
        },
        addToCartSuccess: (state: IUsersState) => {
            state.cart.quantity += 1;
        },
        getCartsSuccess: (
            state: IUsersState,
            action: PayloadAction<ICartsResponse[]>
        ) => {
            let subTotal = 0;
            let quantity = 0;
            const groupByProducts = action.payload.reduce(
                (group, cart) => {
                    const { id } = cart.product;
                    if (group[id]) {
                        group[id].total = group[id].total + cart.product.price;
                        group[id].quantity = ++group[id].quantity;
                    } else {
                        group[id] = {
                            ...cart.product,
                            total: cart.product.price,
                            quantity: 1,
                            cartId: cart.id,
                        };
                    }
                    subTotal += Number(cart.product.price);
                    quantity += 1;
                    return group;
                },
                {} as Record<string, IProductCart>
            );
            if (action.payload[0]) {
                state.cart.products = Object.values(groupByProducts);
                state.cart.subtotal = subTotal;
                state.cart.userId = action.payload[0]?.userId;
                state.cart.quantity = quantity;
            }
        },
        getHistorySuccess: (
            state: IUsersState,
            action: PayloadAction<IHistoryResponse[]>
        ) => {
            state.history = action.payload;
        },
        removeCartSuccess: (
            state: IUsersState,
            action: PayloadAction<{ quantity: number; id: string[] }>
        ) => {
            state.cart.products = state.cart.products.filter(
                product => !action.payload.id.some(c => c === product.id)
            );
            state.cart.quantity -= action.payload.quantity;
        },
        calculateTotal: (
            state: IUsersState,
            action: PayloadAction<{
                productId: string;
                type: '+' | '-';
            }>
        ) => {
            state.cart.products = state.cart.products.map(pr => {
                if (pr.id === action.payload.productId) {
                    if (pr && action.payload.type === '+') {
                        pr.total += pr?.price;
                        pr.quantity += 1;
                        state.cart.subtotal += pr?.price;
                        state.cart.quantity += 1;
                    }
                    if (pr.id && action.payload.type === '-') {
                        pr.total -= pr.price;
                        pr.quantity -= 1;
                        state.cart.subtotal -= pr.price;
                        state.cart.quantity -= 1;
                    }
                    return pr;
                }
                return pr;
            });
        },
        isUserLoading: (state: IUsersState, action: PayloadAction<boolean>) => {
            state.user.isLoading = action.payload;
        },
        isCartLoading: (state: IUsersState, action: PayloadAction<boolean>) => {
            state.isCartLoading = action.payload;
        },
        isUserProfileImageDeleteLoading: (
            state: IUsersState,
            action: PayloadAction<boolean>
        ) => {
            state.isUserProfileImageDeleteLoading = action.payload;
        },
        isUserProfileImageLoading: (
            state: IUsersState,
            action: PayloadAction<boolean>
        ) => {
            state.isUserProfileImageLoading = action.payload;
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
        addProfileImageSuccess: (
            state: IUsersState,
            action: PayloadAction<IUserResponse>
        ) => {
            state.user.data = { ...state.user.data, ...action.payload };
        },
        deleteProfileImageSuccess: (
            state: IUsersState,
            action: PayloadAction<IUserResponse>
        ) => {
            state.user.data = {
                ...state.user.data,
                url: action.payload.url,
                publicId: action.payload.publicId,
            };
        },
    },
});

export const {
    getUserInit,
    addToCartSuccess,
    addProfileImageSuccess,
    deleteProfileImageSuccess,
    isUserProfileImageDeleteLoading,
    getCartsSuccess,
    calculateTotal,
    removeCartSuccess,
    getUserSuccess,
    getHistorySuccess,
    isUserLoading,
    updateUserEmailSuccess,
    updateUserSuccess,
    isCartLoading,
    isUserProfileImageLoading,
    isUserEmailLoading,
} = userSlice.actions;

export default userSlice.reducer;
