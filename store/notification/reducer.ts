import { COMMON_ERROR_TYPES } from '@constant/error';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { TypeOptions } from 'react-toastify';
import { NotificationTypes } from 'types';

export interface INotificationState {
    message: string;
    type: TypeOptions;
}

const initialState: INotificationState = {
    message: '',
    type: 'success',
};

const notificationSlice = createSlice({
    name: 'notifications',
    initialState,
    reducers: {
        showNotification: (state, action: PayloadAction<NotificationTypes>) => {
            state.message =
                action.payload.message ||
                COMMON_ERROR_TYPES.INTERNAL_SERVER_ERROR.msg;
            state.type = action.payload.type;
        },
        hideNotification: state => {
            state.message = '';
            state.type = 'success';
        },
    },
});

export const { showNotification, hideNotification } = notificationSlice.actions;
export default notificationSlice.reducer;
