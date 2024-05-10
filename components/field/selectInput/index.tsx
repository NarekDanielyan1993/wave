import { Select } from '@chakra-ui/react';
import { Controller, useFormContext } from 'react-hook-form';
import { ISelectFieldProps } from 'types';
import { StyledSelect } from '../style';

// eslint-disable-next-line react/function-component-definition
function SelectField<T>({
    label,
    name,
    disabled,
    options,
    ...props
}: ISelectFieldProps<T>) {
    const { control, formState } = useFormContext();
    // const errorMessage = formState.errors[name]
    //     ? (formState.errors[name]?.message as string)
    //     : null;

    return (
        <Controller
            control={control}
            name={name}
            render={({ field: { onChange } }) => (
                <StyledSelect>
                    <Select
                        isDisabled={disabled}
                        {...props}
                        onChange={val => onChange(val)}
                    >
                        {options.map(option => (
                            <option key={option.id} value={option.id}>
                                {option.name}
                            </option>
                        ))}
                    </Select>
                </StyledSelect>
            )}
        />
    );
}

export default SelectField;
