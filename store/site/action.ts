import type {
    CreateSiteActionTypes,
    CreateSitePayloadType,
    GetSiteActionTypes,
    GetSiteImageActionTypes,
    SiteDeleteActionTypes,
    SiteDeletePayloadType,
    UpdateSiteActionTypes,
    UpdateSitePayloadType,
    UploadSiteActionTypes,
    UploadSitePayloadType,
} from 'types/client/store/site';

export const GET_SITE = 'GET_SITE';
export const UPDATE_SITE = 'UPDATE_SITE';
export const CREATE_SITE = 'CREATE_SITE';
export const UPLOAD_SITE_IMAGE = 'UPLOAD_SITE_IMAGE';
export const DELETE_SITE_IMAGE = 'DELETE_SITE_IMAGE';
export const GET_SITE_IMAGE = 'GET_SITE_IMAGE';

export const siteReducerName = 'site';

export function getSite(): GetSiteActionTypes {
    return {
        type: GET_SITE,
    };
}

export function createSite(data: CreateSitePayloadType): CreateSiteActionTypes {
    return {
        type: CREATE_SITE,
        payload: data,
    };
}

export function getSiteImages(): GetSiteImageActionTypes {
    return {
        type: GET_SITE_IMAGE,
    };
}

export function uploadSiteImage(
    data: UploadSitePayloadType
): UploadSiteActionTypes {
    return {
        type: UPLOAD_SITE_IMAGE,
        payload: data,
    };
}

export function deleteSiteImage(
    data: SiteDeletePayloadType
): SiteDeleteActionTypes {
    return {
        type: DELETE_SITE_IMAGE,
        payload: data,
    };
}

export function editSite(data: UpdateSitePayloadType): UpdateSiteActionTypes {
    return {
        type: UPDATE_SITE,
        payload: data,
    };
}
