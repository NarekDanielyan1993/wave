import type {
    CreateSiteActionTypes,
    CreateSitePayloadType,
    GetSiteActionTypes,
    UpdateSiteActionTypes,
    UpdateSitePayloadType,
} from 'types/client/store/site';

export const GET_SITE = 'GET_SITE';
export const UPDATE_SITE = 'UPDATE_SITE';
export const CREATE_SITE = 'CREATE_SITE';

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

export function editSite(data: UpdateSitePayloadType): UpdateSiteActionTypes {
    return {
        type: UPDATE_SITE,
        payload: data,
    };
}
