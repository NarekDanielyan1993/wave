import type { AppState } from '@store/create-store';

export const fretsSelector = (state: AppState) => state.fretsState;
export const paginatedFretsSelector = (state: AppState) => state.fretsState;
