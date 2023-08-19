import FormInput from '@components/field';
import { joiResolver } from '@hookform/resolvers/joi';
import { UseFormProps, useForm as useReactHookForm } from 'react-hook-form';
import { IFormProps } from 'types';

const useForm = ({ validationSchema, defaultValues }: IFormProps) => {
    const {
        register,
        watch,
        setValue,
        handleSubmit,
        control,
        reset,
        formState,
    } = useReactHookForm<UseFormProps>({
        mode: 'onChange',
        reValidateMode: 'onChange',
        resolver: joiResolver(validationSchema),
        defaultValues,
    });

    const FormField = ({ name, label, views, format }) => (
        <FormInput
            control={control}
            error={formState?.errors[name]?.message}
            format={format}
            label={label}
            name={name}
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
    };
};

export default useForm;
