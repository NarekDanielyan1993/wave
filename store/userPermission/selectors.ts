import { AppState } from '@store/create-store';

export const userPermissionsSelector = (state: AppState) =>
    state.userPermissionsState;
