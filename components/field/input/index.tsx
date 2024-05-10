import { Box } from '@chakra-ui/react';
import {
    StyledErrorText,
    StyledFormControl,
    StyledFormLabel,
    StyledInput,
} from '@components/field/style';
import { ITextFieldProps } from 'types';

function Input<T>({
    onChange,
    value,
    label,
    disabled,
    type = 'text',
    name,
    errorMessage,
    ...props
}: ITextFieldProps<T>) {
    return (
        <StyledFormControl>
            <Box pos="relative">
                <StyledInput
                    isDisabled={disabled}
                    onChange={onChange}
                    placeholder=" "
                    type={type}
                    value={value}
                    {...props}
                />
                <StyledFormLabel htmlFor={name}>{label}</StyledFormLabel>
            </Box>
            <StyledErrorText>{errorMessage}</StyledErrorText>
        </StyledFormControl>
    );
}

export default Input;
