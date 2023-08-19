import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ErrorObject } from 'types';

interface ErrorState {
    errors: ErrorObject[];
}

const initialState: ErrorState = {
    errors: [],
};

const errorSlice = createSlice({
    name: 'error',
    initialState,
    reducers: {
        setError(state, action: PayloadAction<string>) {
            state.errors.push({ action: action.type, message: action.payload });
        },
        clearError(state, action: PayloadAction<string>) {
            state.errors = state.errors.filter(
                error => error.action !== action.payload
            );
        },
    },
});

export const { setError, clearError } = errorSlice.actions;

export default errorSlice.reducer;
