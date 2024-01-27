import { AppState } from '@store/create-store';

export const userSelector = (state: AppState) => state.userState.user;
export const usersSelector = (state: AppState) => state.userState;
export const historySelector = (state: AppState) => state.userState.history;
