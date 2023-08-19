import { combineReducers } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';
import errorReducer from './error/reducer';

const reducer = combineReducers({
    errorState: errorReducer,
});

const rootReducer = (state, action) => {
    if (action.type === HYDRATE) {
        const nextState = {
            ...state, // use previous state
            ...action.payload, // apply delta from hydration
        };
        if (state.count) {
            nextState.count = state.count;
        } // preserve count value on client side navigation
        return nextState;
    }
    return reducer;
};

export default rootReducer;
