import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type {
    ISiteImageResponse,
    ISiteResponse,
} from 'types/client/store/site';
import { siteReducerName } from './action';

interface ISiteState {
    site: ISiteResponse;
    siteImages: ISiteImageResponse[];
    isSiteLoading: boolean;
    isSiteImageLoading: boolean;
}

const initialState: ISiteState = {
    site: {} as ISiteResponse,
    siteImages: [],
    isSiteLoading: false,
    isSiteImageLoading: false,
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
        isSiteLoading: (state: ISiteState, action: PayloadAction<boolean>) => {
            state.isSiteLoading = action.payload;
        },
        isSiteImageLoading: (
            state: ISiteState,
            action: PayloadAction<boolean>
        ) => {
            state.isSiteImageLoading = action.payload;
        },
        uploadSiteImageSuccess: (
            state: ISiteState,
            action: PayloadAction<ISiteImageResponse>
        ) => {
            state.siteImages = [...state.siteImages, action.payload];
        },
        updateSiteSuccess: (
            state: ISiteState,
            action: PayloadAction<ISiteResponse>
        ) => {
            state.site = action.payload;
        },
        deleteSiteImageSuccess: (
            state: ISiteState,
            action: PayloadAction<ISiteImageResponse>
        ) => {
            state.siteImages = state.siteImages.filter(
                image => image.id !== action.payload.id
            );
        },
        getSiteImageSuccess: (
            state: ISiteState,
            action: PayloadAction<ISiteImageResponse[]>
        ) => {
            state.siteImages = action.payload;
        },
    },
});

export const {
    getSiteSuccess,
    updateSiteSuccess,
    deleteSiteImageSuccess,
    uploadSiteImageSuccess,
    getSiteImageSuccess,
    isSiteLoading,
    isSiteImageLoading,
} = siteSlice.actions;

export default siteSlice.reducer;
