import { chakra } from '@chakra-ui/react';

export const StyledProductHeader = chakra('div', {
    baseStyle: {
        py: 4,
        maxWidth: '4xl',
        margin: '0 auto',
        textTransform: 'uppercase',
    },
});

export const StyledProductContainer = chakra('div', {
    baseStyle: {
        borderBottom: '2px solid lightgray',
        mb: 6,
    },
});
