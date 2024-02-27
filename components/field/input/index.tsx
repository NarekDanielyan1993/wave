import { Box } from '@chakra-ui/react';
import { ChangeEvent } from 'react';
import {
    StyledErrorText,
    StyledFormControl,
    StyledFormLabel,
    StyledInput,
} from '../style';

const Input = ({
    onChange,
    value,
    label,
    name,
    isInvalid,
    error,
}: {
    onChange: (e: ChangeEvent<Element>) => void;
    name: string;
    label: string | undefined;
    isInvalid: boolean | undefined;
    error: string | undefined;
}) => (
    <StyledFormControl>
        <Box pos="relative">
            <StyledInput
                isInvalid={isInvalid}
                onChange={onChange}
                placeholder=" "
                value={value}
            />
            <StyledFormLabel htmlFor={name}>{label}</StyledFormLabel>
        </Box>
        <StyledErrorText>{isInvalid && error}</StyledErrorText>
    </StyledFormControl>
);

export default Input;
