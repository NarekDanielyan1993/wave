import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { ProductsReducerName } from './action';

interface IProductsState {
    isLoading: boolean;
}

const initialState: IProductsState = {
    isLoading: false,
};

const authSlice = createSlice({
    name: ProductsReducerName,
    initialState,
    reducers: {
        isAuthLoading: (
            state: IProductsState,
            action: PayloadAction<boolean>
        ) => {
            state.isLoading = action.payload;
        },
    },
});

export const { isAuthLoading } = authSlice.actions;
export default authSlice.reducer;
