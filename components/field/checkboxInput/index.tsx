import { Checkbox } from '@chakra-ui/react';
import { Controller, useFormContext } from 'react-hook-form';
import { ICheckboxProps } from 'types';
import { StyledErrorText, StyledFormControl } from '../style';

// eslint-disable-next-line react/function-component-definition
function CheckboxField<T>({ label, name, disabled }: ICheckboxProps<T>) {
    const { control, formState } = useFormContext();
    const errorMessage = formState.errors[name]
        ? (formState.errors[name]?.message as string)
        : null;

    return (
        <Controller
            control={control}
            name={name}
            render={({ field: { value, onChange } }) => (
                <StyledFormControl>
                    <Checkbox
                        colorScheme="blue"
                        isChecked={value}
                        isDisabled={disabled}
                        onChange={onChange}
                    >
                        {label}
                    </Checkbox>
                    <StyledErrorText>{errorMessage}</StyledErrorText>
                </StyledFormControl>
            )}
        />
    );
}

export default CheckboxField;
