import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { AuthReducerName } from './action';

interface IProductsState {
    isLoading: boolean;
}

const initialState: IProductsState = {
    isLoading: false,
};

const authSlice = createSlice({
    name: AuthReducerName,
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
