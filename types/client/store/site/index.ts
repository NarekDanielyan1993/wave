import type {
    CREATE_SITE,
    DELETE_SITE_IMAGE,
    GET_SITE,
    GET_SITE_IMAGE,
    UPDATE_SITE,
    UPLOAD_SITE_IMAGE,
} from '@store/site/siteAction';

export type GET_SITE_TYPE = typeof GET_SITE;
export type UPDATE_SITE_TYPE = typeof UPDATE_SITE;
export type CREATE_SITE_TYPE = typeof CREATE_SITE;
export type UPLOAD_SITE_IMAGE_TYPE = typeof UPLOAD_SITE_IMAGE;
export type DELETE_SITE_IMAGE_TYPE = typeof DELETE_SITE_IMAGE;
export type GET_SITE_IMAGE_TYPE = typeof GET_SITE_IMAGE;

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

export type GetSiteImageActionTypes = {
    type: GET_SITE_IMAGE_TYPE;
};

export interface UploadSitePayloadType {
    name: string;
    url: string;
}

export type UploadSiteActionTypes = {
    type: UPLOAD_SITE_IMAGE_TYPE;
    payload: UploadSitePayloadType;
};

export interface SiteDeletePayloadType {
    id: string;
    publicId: string;
}

export type SiteDeleteActionTypes = {
    type: DELETE_SITE_IMAGE_TYPE;
    payload: SiteDeletePayloadType;
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

export type ISiteImageResponse = {
    id: string;
    name: string;
    url: string;
    publicId: string;
    createdAt: string;
    updatedAt: string;
};
