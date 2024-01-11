import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { ISiteResponse } from 'types/client/store/site';
import { siteReducerName } from './action';

interface ISiteState {
    site: ISiteResponse;
}

const initialState: ISiteState = {
    site: {} as ISiteResponse,
};

const siteSlice = createSlice({
    name: siteReducerName,
    initialState,
    reducers: {
        getSiteSuccess: (
            state: ISiteState,
            action: PayloadAction<ISiteResponse>
        ) => {
            state.site = action.payload;
        },
        updateSiteSuccess: (
            state: ISiteState,
            action: PayloadAction<ISiteResponse>
        ) => {
            state.site = action.payload;
        },
    },
});

export const { getSiteSuccess, updateSiteSuccess } = siteSlice.actions;

export default siteSlice.reducer;
