import { COMMON_ERROR_TYPES } from '@constant/error';
import { ToastOptions, TypeOptions, toast } from 'react-toastify';

export const useNotification = () => {
    const toastify = (type: TypeOptions, message: string) => {
        let msg = '';
        switch (type) {
            case 'success': {
                msg = message || 'Good Job!!';
            }
            case 'error': {
                msg = message || COMMON_ERROR_TYPES.INTERNAL_SERVER_ERROR.msg;
            }
        }
        const toastOptions: ToastOptions = {
            type,
        };
        toast(msg, toastOptions);
    };

    return { toast: toastify };
};
