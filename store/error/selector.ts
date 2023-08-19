import { RootState } from '@store/root-reducer';

export const getErrors = (state: RootState) => state.errorState.errors;
