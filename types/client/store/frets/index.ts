import {
    ADD_FRETS,
    DELETE_FRETS,
    EDIT_FRETS,
    GET_FRETS,
} from '@store/frets/action';
import { GET_BRANDS } from '@store/products/productAction';
import type { Filters } from 'types/database';

export type GET_FRETS_TYPE = typeof GET_FRETS;
export type DELETE_FRETS_TYPE = typeof DELETE_FRETS;
export type EDIT_FRETS_TYPE = typeof EDIT_FRETS;
export type ADD_FRETS_TYPE = typeof ADD_FRETS;
export type GET_BRANDS_TYPE = typeof GET_BRANDS;

// ACTIONS

export interface IAddFrets {
    frets: string;
}

export type GetPaginatedFretsActionPayload = {
    filters?: Filters;
    page?: number;
    order?: string;
    limit?: number;
};

export type GetPaginatedFretsActionTypes = {
    type: GET_FRETS_TYPE;
    payload: GetPaginatedFretsActionPayload;
};

export interface IDeleteProductAction {
    type: DELETE_FRETS_TYPE;
    payload: IDeleteFretsPayload;
}

export interface IDeleteFretsPayload {
    id: string;
}

export interface IDeleteFretsAction {
    type: DELETE_FRETS_TYPE;
    payload: IDeleteFretsPayload;
}

export type DeleteProductPayloadTypes = {
    id: string;
};

export interface IEditFretsPayload {
    id: string;
    frets: string;
}

export type IEditFretsAction = {
    type: EDIT_FRETS_TYPE;
    payload: IEditFretsPayload;
};

export interface IAddFretsPayload {
    paginationData: GetPaginatedFretsActionPayload;
    data: IAddFrets;
}

export interface IAddFretsActionTypes {
    type: ADD_FRETS_TYPE;
    payload: IAddFretsPayload;
}

export interface GetFretsResponse {
    id: string;
    frets: string;
    createdAt: string;
    updatedAt: string;
}

export interface GetPaginatedFretsResponse {
    filters?: Filters;
    page: number;
    order: string;
    limit: number;
    totalItems: number;
    frets: GetFretsResponse[];
}
