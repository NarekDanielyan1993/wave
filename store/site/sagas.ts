import { SITE_API } from '@constant/api';
import type { PayloadAction } from '@reduxjs/toolkit';
import { apiRequest } from '@utils/apiRequest';
import { call, put, takeLatest } from 'redux-saga/effects';
import type {
    CreateSitePayloadType,
    UpdateSitePayloadType,
} from 'types/client/store/site';
import { CREATE_SITE, GET_SITE, UPDATE_SITE } from './action';
import { getSiteSuccess, updateSiteSuccess } from './reducer';

function* getSiteGenerator() {
    try {
        const { data } = yield call(apiRequest.get, SITE_API.GET_SITE);
        yield put(getSiteSuccess(data));
    } catch (error) {
        console.log(error);
    }
}

function* createSiteGenerator(action: PayloadAction<CreateSitePayloadType>) {
    try {
        const { data } = yield call(apiRequest.post, SITE_API.CREATE_SITE, {
            ...action.payload.site,
        });
        yield put(updateSiteSuccess(data));
    } catch (error) {
        console.log(error);
    }
}

function* updateSiteGenerator(action: PayloadAction<UpdateSitePayloadType>) {
    try {
        const { data } = yield call(
            apiRequest.put,
            `${SITE_API.UPDATE_SITE}/${action.payload.id}`,
            {
                ...action.payload.site,
            }
        );
        yield put(updateSiteSuccess(data));
    } catch (error) {
        console.log(error);
    }
}

export function* watchSiteSaga() {
    yield takeLatest(GET_SITE, getSiteGenerator);
    yield takeLatest(UPDATE_SITE, updateSiteGenerator);
    yield takeLatest(CREATE_SITE, createSiteGenerator);
}
