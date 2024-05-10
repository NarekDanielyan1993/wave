import { configureStore, type Store } from '@reduxjs/toolkit';
import rootReducer from '@store/root-reducer';
import rootSaga from '@store/root-saga';
import { promiseMiddleware } from '@teroneko/redux-saga-promise';
import { config } from '@utils/config';
import { createWrapper } from 'next-redux-wrapper';
import {
    useDispatch,
    useSelector,
    type TypedUseSelectorHook,
} from 'react-redux';
import 'react-toastify/dist/ReactToastify.css';
import createSagaMiddleware, { type Task } from 'redux-saga';

export interface SagaStore extends Store {
    sagaTask?: Task;
}

export const createStore = preloadedState => {
    const sagaMiddleware = createSagaMiddleware();
    const store = configureStore({
        reducer: rootReducer,
        devTools: config.isDev,
        preloadedState,
        middleware: [promiseMiddleware, sagaMiddleware],
    });
    (store as SagaStore).sagaTask = sagaMiddleware.run(rootSaga);
    return store;
};

export type AppStore = ReturnType<typeof createStore>;
export type AppState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector;

export const wrapper = createWrapper<AppStore>(createStore, {
    debug: config.isDev,
    serializeState: state => JSON.stringify(state),
    deserializeState: state => JSON.parse(state),
});
