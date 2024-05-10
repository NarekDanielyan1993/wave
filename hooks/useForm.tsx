// import FormInput from '@components/field';
import CheckboxField from '@components/field/checkboxInput';
import NumericField from '@components/field/numericInput';
import PasswordField from '@components/field/passwordInput';
import SelectField from '@components/field/selectInput';
import TextField from '@components/field/textInput';
import Textarea from '@components/field/textarea';
import { zodResolver } from '@hookform/resolvers/zod';
import { FieldValues, useForm as useReactHookForm } from 'react-hook-form';
// import { FormErrorTypes, IFormFieldProps, IFormProps } from 'types/form';

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
        getFieldState,
        setError,
        trigger,
        getValues,
        resetField,
        unregister,
        setFocus,
    } = useReactHookForm<T>({
        disabled: isDisabled,
        mode: 'onChange',
        reValidateMode: 'onChange',
        ...(validationSchema && { resolver: zodResolver(validationSchema) }),
        defaultValues,
    });
    console.log(formState.errors);

    // const FormField = ({
    //     name,
    //     label,
    //     type,
    //     views,
    //     format,
    //     disabled,
    //     options,
    // }: IFormFieldProps<T>) => (
    //     <FormInput
    //         clearErrors={clearErrors}
    //         control={control}
    //         disabled={disabled}
    //         error={(formState.errors[name] as FormErrorTypes)?.message}
    //         format={format}
    //         label={label}
    //         name={name}
    //         options={options}
    //         type={type}
    //         views={views}
    //     />
    // );

    return {
        register,
        setValue,
        watch,
        handleSubmit,
        TextField: TextField<T>,
        PasswordField: PasswordField<T>,
        SelectField: SelectField<T>,
        CheckboxField: CheckboxField<T>,
        NumericField: NumericField<T>,
        Textarea: Textarea<T>,
        reset,
        formState,
        control,
        clearErrors,
        getFieldState,
        setError,
        trigger,
        getValues,
        resetField,
        unregister,
        setFocus,
    };
};

export default useForm;
