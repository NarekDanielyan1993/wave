import { Box, Button, Input } from '@chakra-ui/react';

const NumberInput = ({
    onChange,
    value,
    width,
}: {
    value: any;
    width?: string;
    onChange: (value: '+' | '-') => void;
}) => {
    return (
        <Box w={width} display={'flex'} gap={2}>
            <Button onClick={() => onChange('+')} variant="primary">
                +
            </Button>
            <Input value={value} type="number" />
            <Button
                isDisabled={value === 1}
                onClick={() => onChange('-')}
                variant="primary"
            >
                -
            </Button>
        </Box>
    );
};

export default NumberInput;
