import { TOAST_SETTINGS } from '@constant/notification';
import { useNotification } from '@hooks/useNotification';
import { useAppDispatch, useAppSelector } from '@store/create-store';
import { hideNotification } from '@store/notification/reducer';
import { notificationSelector } from '@store/notification/selector';
import { useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Notification = () => {
    const { message, type } = useAppSelector(notificationSelector);
    const { toast } = useNotification();
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (message) {
            toast(type, message);
            dispatch(hideNotification());
        }
    }, [message, type]);

    return <ToastContainer {...TOAST_SETTINGS} />;
};

export default Notification;
