import FormInput from '@components/field';
import FormSearchInput from '@components/searchField';
import { zodResolver } from '@hookform/resolvers/zod';
import { FieldValues, useForm as useReactHookForm } from 'react-hook-form';
import {
    FormErrorTypes,
    IFormFieldProps,
    IFormFieldSearchProps,
    IFormProps,
} from 'types/form';

const useForm = <T extends FieldValues>({
    validationSchema,
    defaultValues,
}: IFormProps<T>) => {
    const {
        register,
        watch,
        setValue,
        handleSubmit,
        control,
        reset,
        formState,
        clearErrors,
    } = useReactHookForm<T>({
        mode: 'onChange',
        reValidateMode: 'onChange',
        resolver: zodResolver(validationSchema),
        defaultValues,
    });
    console.log(formState.errors);

    const FormField = ({
        name,
        label,
        type,
        views,
        format,
        disabled,
        eraseFieldsOnChange,
        options,
    }: IFormFieldProps<T>) => (
        <FormInput
            clearErrors={clearErrors}
            control={control}
            disabled={disabled}
            eraseFieldsOnChange={eraseFieldsOnChange}
            error={(formState.errors[name] as FormErrorTypes)?.message}
            format={format}
            label={label}
            name={name}
            options={options}
            type={type}
            views={views}
        />
    );

    const FormSearchField = ({
        name,
        label,
        disabled,
        fn,
    }: IFormFieldSearchProps<T>) => (
        <FormSearchInput
            clearErrors={clearErrors}
            control={control}
            disabled={disabled}
            dispatchFn={fn}
            error={(formState.errors[name] as FormErrorTypes)?.message}
            label={label}
            name={name}
        />
    );

    return {
        register,
        setValue,
        watch,
        handleSubmit,
        FormField,
        FormSearchField,
        reset,
        formState,
        control,
        clearErrors,
    };
};

export default useForm;
