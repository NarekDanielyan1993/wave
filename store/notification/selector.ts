import type { AppState } from '@store/create-store';

export const notificationSelector = (state: AppState) =>
    state.notificationState;
