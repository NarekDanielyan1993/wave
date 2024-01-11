import { AnyAction } from '@reduxjs/toolkit';
import { IFormFieldProps, IFormProps } from 'types/form';

export type ProfileFormTypes<T> = {
    fields: IFormFieldProps<T>[];
    buttonText: string;
    isLoading: boolean;
    submitFn: (data: T) => AnyAction;
} & IFormProps<T>;

export type UserProfileFormSectionTypesUnion = 'email' | 'credential';
