import { chakra } from '@chakra-ui/react';

export const StyledCart = chakra('div', {
    baseStyle: {
        display: 'flex',
        gap: 2,
    },
});

export const StyledPayment = chakra('div', {
    baseStyle: {
        width: '35%',
    },
});
