import { ObjectSchema } from 'joi';
import { FieldValues, UseControllerProps, UseFormProps } from 'react-hook-form';

export interface IFormProps extends UseFormProps {
    validationSchema: ObjectSchema;
}

export interface IFormFieldProps extends FieldValues {
    views: string[];
    format: string;
    label: string;
    name: string;
}

interface Option {
    id: string;
    name: string;
}

export interface IFormInputProps extends UseControllerProps {
    label?: string;
    type?: string;
    error?: string;
    isInvalid?: boolean;
    defaultValue?: any;
    options?: Option[];
    views?: string[];
    format?: string;
    size?: string;
}
