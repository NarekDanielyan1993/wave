import type { CREATE_SITE, GET_SITE, UPDATE_SITE } from '@store/site/action';

export type GET_SITE_TYPE = typeof GET_SITE;
export type UPDATE_SITE_TYPE = typeof UPDATE_SITE;
export type CREATE_SITE_TYPE = typeof CREATE_SITE;

export type GetSiteActionTypes = {
    type: GET_SITE_TYPE;
};

export type GetSitePayloadType = {
    email: string;
};

export type CreateSitePayloadType = {
    site: SiteType;
};

export type CreateSiteActionTypes = {
    type: CREATE_SITE_TYPE;
    payload: CreateSitePayloadType;
};

export type UpdateSitePayloadType = {
    id: string;
    site: SiteType;
};

export type UpdateSiteActionTypes = {
    type: UPDATE_SITE_TYPE;
    payload: UpdateSitePayloadType;
};

export type SiteType = {
    address: string;
    email: string;
    hours: string;
    phone: string;
};

export type ISiteResponse = {
    id: string;
    address: string;
    email: string;
    hours: string;
    phone: string;
};
