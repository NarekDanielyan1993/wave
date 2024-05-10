/* eslint-disable react/function-component-definition */
import { Box } from '@chakra-ui/react';
import { Controller, useFormContext } from 'react-hook-form';
import { NumericFormat } from 'react-number-format';
import { INumberFieldProps } from 'types';
import {
    StyledErrorText,
    StyledFormControl,
    StyledFormLabel,
    StyledInput,
} from '../style';

function NumericField<T>({
    name,
    label,
    allowLeadingZeros = false,
    allowNegative = false,
    prefix,
    placeholder = ' ',
}: INumberFieldProps<T>) {
    const { control, formState } = useFormContext();
    const errorMessage = formState.errors[name]
        ? (formState.errors[name]?.message as string)
        : null;

    return (
        <Controller
            control={control}
            name={name}
            render={({ field: { onChange, value } }) => (
                <StyledFormControl>
                    <Box pos="relative">
                        <NumericFormat
                            allowLeadingZeros={allowLeadingZeros}
                            allowNegative={allowNegative}
                            customInput={StyledInput}
                            isInvalid={!!errorMessage}
                            onChange={onChange}
                            placeholder={placeholder}
                            prefix={prefix}
                            value={value}
                            valueIsNumericString={value}
                        />
                        <StyledFormLabel htmlFor={name}>
                            {label}
                        </StyledFormLabel>
                    </Box>
                    <StyledErrorText>{errorMessage}</StyledErrorText>
                </StyledFormControl>
            )}
        />
    );
}
export default NumericField;
