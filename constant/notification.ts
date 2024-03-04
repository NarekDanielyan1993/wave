import { ToastContainerProps } from 'react-toastify';
import { NotificationMessageTypesUnion } from 'types';

export const TOAST_SETTINGS: ToastContainerProps = {
    autoClose: 5000,
    position: 'bottom-left',
};

export const NOTIFICATION_TYPES: NotificationMessageTypesUnion =
    'success' || 'error' || 'info' || 'warning';

export const NOTIFICATION_MESSAGES = {
    SUCCESS: {
        SIGN_UP:
            'A verification link has been sent to your email. Please check your inbox to verify your account.',
    },
    FRETS: {
        GET_ALL_FAILURE: 'Failed to get frets.',
        ADD_FAILURE: 'Failed to add frets.',
        EDIT_FAILURE: 'Failed to edit frets.',
        DELETE_FAILURE: 'Failed to delete frets.',
    },
};
