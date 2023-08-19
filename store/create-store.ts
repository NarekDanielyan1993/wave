import { Store, configureStore } from '@reduxjs/toolkit';
import rootReducer from '@store/root-reducer';
import rootSaga from '@store/root-saga';
import { createWrapper } from 'next-redux-wrapper';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import createSagaMiddleware, { Task } from 'redux-saga';

export interface SagaStore extends Store {
    sagaTask?: Task;
}

const sagaMiddleware = createSagaMiddleware();
const store = configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware().concat(sagaMiddleware),
});

(store as SagaStore).sagaTask = sagaMiddleware.run(rootSaga);

export type AppStore = typeof store;
export type RootState = ReturnType<typeof rootReducer>;
export type AppState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

const makeStore = () => store;

export const wrapper = createWrapper<Store<AppState>>(makeStore, {
    debug: true,
});
