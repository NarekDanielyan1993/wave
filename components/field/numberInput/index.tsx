import { Box, Button } from '@chakra-ui/react';

const NumberInput = ({
    onChange,
    value,
    width,
}: {
    value: any;
    width?: string;
    onChange: (type: '+' | '-') => void;
}) => (
    <Box alignItems="flex-start" display="flex" gap={2} w={width}>
        <Button onClick={() => onChange('+')} variant="primary">
            +
        </Button>
        <Box
            bgColor="brand.primary.main"
            borderRadius="4px"
            opacity={0.9}
            px="1rem"
            py="8px"
        >
            {value}
        </Box>
        <Button
            isDisabled={value === 1}
            onClick={() => onChange('-')}
            variant="primary"
        >
            -
        </Button>
    </Box>
);

export default NumberInput;
