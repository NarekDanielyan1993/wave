import { Box } from '@chakra-ui/react';
import { Controller, useFormContext } from 'react-hook-form';
import { ITextFieldProps } from 'types';
import {
    StyledErrorText,
    StyledFormControl,
    StyledFormLabel,
    StyledInput,
} from '../style';

function Textarea<T>({
    label,
    name,
    disabled,
    type = 'text',
}: ITextFieldProps<T>) {
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
                        <StyledInput
                            as="textarea"
                            isDisabled={disabled}
                            isInvalid={!!errorMessage}
                            onChange={onChange}
                            p={4}
                            placeholder=" "
                            resize="none"
                            rows={4}
                            type={type}
                            value={value}
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

export default Textarea;
