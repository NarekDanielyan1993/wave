import { PayloadAction } from '@reduxjs/toolkit';
import { takeLatest } from 'redux-saga/effects';
import { ADD_ERROR, REMOVE_ERROR } from './action';

function* addErrorGenerator(action: PayloadAction<string>) {
    // Handle the error action
    // yield put(setError(action.payload));
}

function* removeErrorGenerator(action: PayloadAction<string>) {
    // Handle the error action
    // yield put(setError(action.payload));
}

export function* watchError() {
    yield takeLatest(ADD_ERROR, addErrorGenerator);
    yield takeLatest(REMOVE_ERROR, removeErrorGenerator);
}
