import { Box, chakra } from '@chakra-ui/react';

export const StyledIndicator = chakra(Box, {
    baseStyle: {
        backgroundColor: 'white',
        w: '1rem',
        h: '1rem',
        borderRadius: '50%',
        cursor: 'pointer',
    },
});
