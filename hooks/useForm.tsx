import FormInput from '@components/field';
import { FieldValues, useForm as useReactHookForm } from 'react-hook-form';
import { FormErrorTypes, IFormFieldProps, IFormProps } from 'types/form';

const useForm = <T extends FieldValues>({
    validationSchema,
    defaultValues,
    isDisabled,
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
        disabled: isDisabled,
        mode: 'onChange',
        reValidateMode: 'onChange',
        ...(validationSchema ?? { resolver: validationSchema }),
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
        options,
    }: IFormFieldProps<T>) => (
        <FormInput
            clearErrors={clearErrors}
            control={control}
            disabled={disabled}
            error={(formState.errors[name] as FormErrorTypes)?.message}
            format={format}
            label={label}
            name={name}
            options={options}
            type={type}
            views={views}
        />
    );

    return {
        register,
        setValue,
        watch,
        handleSubmit,
        FormField,
        reset,
        formState,
        control,
        clearErrors,
    };
};

export default useForm;
