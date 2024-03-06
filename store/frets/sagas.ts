import { FRETS_API } from '@constant/api';
import type { PayloadAction } from '@reduxjs/toolkit';
import { showNotification } from '@store/notification/reducer';
import { apiRequest } from '@utils/apiRequest';
import type { AxiosResponse } from 'axios';
import { call, put, takeLatest } from 'redux-saga/effects';
import type { IAddProductPayload } from 'types';
import {
    GetFretsResponse,
    GetPaginatedFretsActionPayload,
    GetPaginatedFretsResponse,
    IDeleteFretsPayload,
    IEditFretsPayload,
} from 'types/client/store/frets';
import { IFretResponse } from 'types/fret';
import type { IProductResponse } from 'types/product';
import {
    ADD_FRETS,
    DELETE_FRETS,
    EDIT_FRETS,
    GET_FRETS,
    getFrets,
} from './action';
import {
    deleteFretsSuccess,
    editFretsSuccess,
    getPaginatedFretsSuccess,
    isFretsLoading,
} from './reducer';

function* getPaginatedFretsGenerator(
    action: PayloadAction<GetPaginatedFretsActionPayload>
) {
    try {
        yield put(isFretsLoading(true));
        const { data }: AxiosResponse<GetPaginatedFretsResponse> = yield call(
            apiRequest.get,
            FRETS_API.GET_PAGINATED_FRETS,
            {
                params: {
                    ...action.payload,
                    ...(action.payload.filters && {
                        filters: JSON.stringify(action.payload.filters),
                    }),
                },
            }
        );
        yield put(getPaginatedFretsSuccess(data));
    } catch (error: any) {
        yield put(
            showNotification({
                message: error?.response?.data?.msg,
                type: 'error',
            })
        );
    }
    yield put(isFretsLoading(false));
}

function* editFretsGenerator(action: PayloadAction<IEditFretsPayload>) {
    const { id, ...frets } = action.payload;
    try {
        yield put(isFretsLoading(true));
        const { data }: AxiosResponse<GetFretsResponse> = yield call(
            apiRequest.put,
            `${FRETS_API.EDIT_FRETS}/${id}`,
            frets
        );
        yield put(editFretsSuccess(data));
    } catch (error: any) {
        yield put(
            showNotification({
                message: error?.response?.data?.msg,
                type: 'error',
            })
        );
    }
    yield put(isFretsLoading(false));
}

function* addFretsGenerator(action: PayloadAction<IAddProductPayload>) {
    try {
        yield put(isFretsLoading(true));
        const { data }: AxiosResponse<IProductResponse> = yield call(
            apiRequest.post,
            FRETS_API.ADD_FRETS,
            {
                ...action.payload.data,
            }
        );
        yield put(
            getFrets({
                limit: action.payload.paginationData.limit,
                page: action.payload.paginationData.page,
            })
        );
    } catch (error: any) {
        yield put(
            showNotification({
                message: error?.response?.data?.msg,
                type: 'error',
            })
        );
    }
    yield put(isFretsLoading(false));
}

function* deleteFretsGenerator(action: PayloadAction<IDeleteFretsPayload>) {
    const { id } = action.payload;

    try {
        yield put(isFretsLoading(true));
        const { data }: AxiosResponse<IFretResponse> = yield call(
            apiRequest.delete,
            `${FRETS_API.DELETE_FRETS}/${id}`,
            {
                params: { fretId: id },
            }
        );
        yield put(deleteFretsSuccess(data));
        yield put(
            getFrets({
                limit: 10,
                page: 0,
            })
        );
    } catch (error: any) {
        yield put(
            showNotification({
                message: error?.response?.data?.msg,
                type: 'error',
            })
        );
    }
    yield put(isFretsLoading(false));
}

export function* watchFretsSaga() {
    yield takeLatest(GET_FRETS, getPaginatedFretsGenerator);
    yield takeLatest(DELETE_FRETS, deleteFretsGenerator);
    yield takeLatest(EDIT_FRETS, editFretsGenerator);
    yield takeLatest(ADD_FRETS, addFretsGenerator);
}
