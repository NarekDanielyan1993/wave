import { AppState } from '@store/create-store';

export const siteSelector = (state: AppState) => state.siteState;
export const siteImagesSelector = (state: AppState) => state.siteState.siteImages;
