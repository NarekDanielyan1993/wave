import { Box, Button } from '@chakra-ui/react';
import NumericInput from '../numericInput';

const NumberInput = ({
    onChange,
    value,
    width,
}: {
    value: any;
    width?: string;
    onChange: (type: '+' | '-' | 'val', value: number) => void;
}) => {
    return (
        <Box w={width} display={'flex'} gap={2}>
            <Button onClick={() => onChange('+', 1)} variant="primary">
                +
            </Button>
            <NumericInput value={value} width={width} onChange={onChange} />
            <Button
                isDisabled={value === 1}
                onClick={() => onChange('-', -1)}
                variant="primary"
            >
                -
            </Button>
        </Box>
    );
};

export default NumberInput;
