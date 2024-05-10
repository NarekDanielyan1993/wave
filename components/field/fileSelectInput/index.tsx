import FileSelect from '@components/field/fileSelectInput/fileSelect';
import { Controller, useFormContext } from 'react-hook-form';
import { ITextFieldProps } from 'types';

function FileSelectInput<T>({ name, disabled }: ITextFieldProps<T>) {
    const { control, formState } = useFormContext();
    // const errorMessage = formState.errors[name]
    //     ? (formState.errors[name]?.message as string)
    //     : null;

    return (
        <Controller
            control={control}
            name={name}
            render={({ field: { onChange, value } }) => (
                <FileSelect onChange={onChange} value={value} />
            )}
        />
    );
}

export default FileSelectInput;
