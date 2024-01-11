import type { AnyAction, CombinedState } from '@reduxjs/toolkit';
import { combineReducers } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';
import { RootReducerStateTypes } from 'types/client/store/rootReducer';
import authSlice from './auth/reducer';
import errorSlice from './error/reducer';
import notificationSlice from './notification/reducer';
import productsSlice from './products/reducer';
import siteSlice from './site/reducer';
import userSlice from './user/reducer';
import userPermissionsSlice from './userPermission/reducer';

const rootReducerState = {
    errorState: errorSlice,
    productState: productsSlice,
    notificationState: notificationSlice,
    authState: authSlice,
    userState: userSlice,
    siteState: siteSlice,
    userPermissionsState: userPermissionsSlice,
};

const reducers = combineReducers(rootReducerState);

const rootReducer = (
    state: any,
    action: AnyAction
): CombinedState<RootReducerStateTypes> => {
    if (action.type === HYDRATE) {
        console.log(action);
        console.log(state);
        const nextState = {
            ...state,
            ...action.payload,
        };
        return nextState;
    }
    return reducers(state, action);
};

export default rootReducer;
