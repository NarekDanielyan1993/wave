import { CheckboxProps, InputProps } from '@chakra-ui/react';
import {
    Control,
    DefaultValues,
    FieldError,
    FieldErrorsImpl,
    FieldValues,
    Merge,
    Path,
    PathValue,
} from 'react-hook-form';
import { ZodSchema } from 'zod';

export type TextFieldType =
    | 'text'
    | 'email'
    | 'number'
    | 'password'
    | 'textarea';

export type ITextFieldProps<T> = {
    label?: string;
    name: Path<T>;
    disabled?: boolean;
    type?: TextFieldType;
    errorMessage?: string;
} & InputProps;

export type INumberFieldProps<T> = {
    label?: string;
    name: Path<T> | string;
    disabled?: boolean;
    allowLeadingZeros?: boolean;
    allowNegative?: boolean;
    prefix: string;
    placeholder?: string;
};

export type ICheckboxProps<T> = {
    label?: string;
    name: Path<T>;
    disabled?: boolean;
} & CheckboxProps;

export type ISelectFieldProps<T> = {
    options: SelectProps[];
    name: Path<T>;
    label?: string;
    disabled?: boolean;
};

export type TextFieldErrorType =
    | FieldError
    | Merge<FieldError, FieldErrorsImpl<any>>
    | null;

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

export interface IFormProps<T> {
    validationSchema?: ZodSchema;
    defaultValues: DefaultValues<T>;
    isDisabled?: boolean;
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
};

export interface ChakraFieldDefaultOptions<T> extends IFormFieldProps<T> {
    isInvalid?: boolean;
}
