import { SITE_API } from '@constant/api';
import type { PayloadAction } from '@reduxjs/toolkit';
import { apiRequest, apiSagaRequest } from '@utils/apiRequest';
import { call, put, takeLatest } from 'redux-saga/effects';
import type {
    CreateSitePayloadType,
    SiteDeletePayloadType,
    UpdateSitePayloadType,
} from 'types/client/store/site';
import {
    CREATE_SITE,
    DELETE_SITE_IMAGE,
    GET_SITE,
    GET_SITE_IMAGE,
    UPDATE_SITE,
    UPLOAD_SITE_IMAGE,
} from './action';
import {
    deleteSiteImageSuccess,
    getSiteImageSuccess,
    getSiteSuccess,
    isSiteLoading,
    updateSiteSuccess,
    uploadSiteImageSuccess,
} from './reducer';

function* getSiteGenerator() {
    try {
        const { data } = yield call(apiRequest.get, SITE_API.GET_SITE);
        yield put(getSiteSuccess(data));
    } catch (error) {
        console.log(error);
    }
}

function* getSiteImageGenerator() {
    try {
        const { data } = yield call(apiRequest.get, SITE_API.GET_SITE_IMAGE);
        yield put(getSiteImageSuccess(data));
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

function* uploadSiteImageGenerator(
    action: PayloadAction<UpdateSitePayloadType>
) {
    try {
        yield put(isSiteLoading(true));
        const { data } = yield call(
            apiRequest.post,
            SITE_API.UPLOAD_SITE_IMAGE,
            {
                ...action.payload,
            }
        );
        yield put(uploadSiteImageSuccess(data));
        yield put(isSiteLoading(false));
    } catch (error) {
        console.log(error);
    }
}

function* deleteSiteImageGenerator(
    action: PayloadAction<SiteDeletePayloadType>
) {
    yield put(isSiteLoading(true));
    try {
        const { data } = yield call(
            apiSagaRequest,
            'delete',
            SITE_API.DELETE_SITE_IMAGE,
            {
                data: { ...action.payload },
            }
        );
        yield put(deleteSiteImageSuccess(data));
    } catch (error) {
        console.log(error);
    }
    yield put(isSiteLoading(false));
}

export function* watchSiteSaga() {
    yield takeLatest(GET_SITE, getSiteGenerator);
    yield takeLatest(UPDATE_SITE, updateSiteGenerator);
    yield takeLatest(UPLOAD_SITE_IMAGE, uploadSiteImageGenerator);
    yield takeLatest(DELETE_SITE_IMAGE, deleteSiteImageGenerator);
    yield takeLatest(CREATE_SITE, createSiteGenerator);
    yield takeLatest(GET_SITE_IMAGE, getSiteImageGenerator);
}
