import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { DateFns } from '@utils/date';
import type { IPaginatedDataResponse } from 'types';
import {
    GetFretsResponse,
    GetPaginatedFretsResponse,
} from 'types/client/store/frets';
import { IFretModelFields, IFretResponse } from 'types/fret';
import { fretsReducerName } from './action';

interface IFretsState {
    isFretsLoading: boolean;
    frets: GetFretsResponse[];
    paginationData: IPaginatedDataResponse<IFretModelFields, number>;
}

const initialState: IFretsState = {
    frets: [],
    paginationData: {
        limit: 10,
        page: 0,
        totalItems: 0,
        order: 'asc',
        sortBy: 'createdAt',
    },
    isFretsLoading: false,
};

const fretsSlice = createSlice({
    name: fretsReducerName,
    initialState,
    reducers: {
        getPaginatedFretsSuccess: (
            state: IFretsState,
            action: PayloadAction<GetPaginatedFretsResponse>
        ) => {
            const dateFns = new DateFns();
            state.frets = action.payload.frets.map(item => ({
                ...item,
                createdAt: dateFns.parseToHumanReadableFormat(
                    item.createdAt as string
                ),
                updatedAt: dateFns.parseToHumanReadableFormat(
                    item.updatedAt as string
                ),
            }));
            state.paginationData.limit = action.payload.limit;
            state.paginationData.page = action.payload.page;
            state.paginationData.totalItems = action.payload.totalItems;
            state.paginationData.filters = action.payload.filters;
        },
        isFretsLoading: (
            state: IFretsState,
            action: PayloadAction<boolean>
        ) => {
            state.isFretsLoading = action.payload;
        },
        editFretsSuccess: (
            state: IFretsState,
            action: PayloadAction<GetFretsResponse>
        ) => {
            const dateFns = new DateFns();
            state.frets = state.frets.map(fret => {
                if (fret.id === action.payload.id) {
                    return {
                        ...action.payload,
                        createdAt: dateFns.parseToHumanReadableFormat(
                            action.payload.createdAt as string
                        ),
                        updatedAt: dateFns.parseToHumanReadableFormat(
                            action.payload.updatedAt as string
                        ),
                    };
                }
                return fret;
            });
        },
        deleteFretsSuccess: (
            state: IFretsState,
            action: PayloadAction<IFretResponse>
        ) => {
            state.frets = state.frets.filter(fr => fr.id !== action.payload.id);
        },
    },
});

export const {
    getPaginatedFretsSuccess,
    isFretsLoading,
    editFretsSuccess,
    deleteFretsSuccess,
} = fretsSlice.actions;
export default fretsSlice.reducer;
