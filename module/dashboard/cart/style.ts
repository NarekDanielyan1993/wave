import { chakra } from '@chakra-ui/react';

export const StyledCart = chakra('div', {
    baseStyle: {
        display: 'flex',
        gap: 4,
    },
});

export const StyledPayment = chakra('div', {
    baseStyle: {
        flexBasis: '20rem',
    },
});
