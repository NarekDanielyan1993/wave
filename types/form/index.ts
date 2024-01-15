export type FieldTypes = {
    name: string;
    label: string;
    format?: string;
    views: string[];
    type: string;
};

export type FormErrorTypes = {
    message: string;
    type: string;
};

import {
    Control,
    DefaultValues,
    FieldValues,
    Path,
    PathValue,
} from 'react-hook-form';
import { ZodSchema } from 'zod';

export interface IFormProps<T> {
    validationSchema: ZodSchema;
    defaultValues: DefaultValues<T>;
}

export type fieldSizesTypesUnion = 'sm' | 'md' | 'lg' | 'xl';

export type IFormFieldProps<T> = {
    views?: string[];
    disabled?: boolean;
    shouldEraseErrorsOnChange?: boolean;
    format?: string;
    label?: string;
    type?: string;
    name: Path<T>;
    size?: fieldSizesTypesUnion;
    options?: SelectProps[];
};

export type IFormFieldSearchProps<T> = {
    disabled?: boolean;
    label?: string;
    name: Path<T>;
    fn: (data: T) => void;
    // clearErrors: UseFormClearErrors
    size?: fieldSizesTypesUnion;
};

type SelectProps = {
    id: string;
    name: string;
};

export type IFormInputProps<T extends FieldValues> = {
    error?: string;
    disabled?: boolean;
    control: Control<T>;
    options?: SelectProps[];
    defaultValue?: PathValue<T, Path<T>> | undefined;
    views?: string[];
    name: Path<T>;
    isInvalid?: boolean;
    size?: string;
    type?: string;
    label?: string;
    format?: string;
    clearErrors: () => void;
    eraseFieldsOnChange: boolean;
};

export interface ChakraFieldDefaultOptions<T> extends IFormFieldProps<T> {
    isInvalid?: boolean;
}
