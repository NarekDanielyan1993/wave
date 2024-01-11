import { AppState } from '@store/create-store';

export const authSelector = (state: AppState) => state.authState;
