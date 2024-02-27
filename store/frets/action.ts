import {
    GetPaginatedFretsActionPayload,
    GetPaginatedFretsActionTypes,
    IAddFrets,
    IAddFretsActionTypes,
    IDeleteFretsAction,
    IDeleteFretsPayload,
    IEditFretsAction,
    IEditFretsPayload,
} from 'types/client/store/frets';

export const GET_FRETS = 'GET_FRETS';
export const DELETE_FRETS = 'DELETE_FRETS';
export const EDIT_FRETS = 'EDIT_FRETS';
export const ADD_FRETS = 'ADD_FRETS';

export const fretsReducerName = 'frets';

export function getFrets(
    data: GetPaginatedFretsActionPayload
): GetPaginatedFretsActionTypes {
    return {
        type: GET_FRETS,
        payload: data,
    };
}

export function editFrets(data: IEditFretsPayload): IEditFretsAction {
    return {
        type: EDIT_FRETS,
        payload: data,
    };
}

export function addFrets(
    paginationData: GetPaginatedFretsActionPayload,
    data: IAddFrets
): IAddFretsActionTypes {
    return {
        type: ADD_FRETS,
        payload: { paginationData, data },
    };
}

export function deleteFrets(data: IDeleteFretsPayload): IDeleteFretsAction {
    return {
        type: DELETE_FRETS,
        payload: data,
    };
}
