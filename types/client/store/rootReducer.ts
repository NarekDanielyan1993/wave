import authSlice from '@store/auth/reducer';
import errorSlice from '@store/error/reducer';
import fretsSlice from '@store/frets/reducer';
import notificationSlice from '@store/notification/reducer';
import productsSlice from '@store/products/reducer';
import siteSlice from '@store/site/reducer';
import userSlice from '@store/user/reducer';
import userPermissionsSlice from '@store/userPermission/reducer';

export type RootReducerStateTypes = {
    errorState: ReturnType<typeof errorSlice>;
    productState: ReturnType<typeof productsSlice>;
    fretsState: ReturnType<typeof fretsSlice>;
    notificationState: ReturnType<typeof notificationSlice>;
    authState: ReturnType<typeof authSlice>;
    userState: ReturnType<typeof userSlice>;
    siteState: ReturnType<typeof siteSlice>;
    userPermissionsState: ReturnType<typeof userPermissionsSlice>;
};
