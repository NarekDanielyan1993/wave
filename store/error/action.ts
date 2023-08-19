import { createAction } from '@reduxjs/toolkit';

export const ADD_ERROR = 'ADD_ERROR';
export const REMOVE_ERROR = 'REMOVE_ERROR';

export const setError = createAction<string>(ADD_ERROR);

export const clearError = createAction<string>(REMOVE_ERROR);
