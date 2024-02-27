import { chakra } from '@chakra-ui/react';

export const StyledSlimPromotionContainer = chakra('div', {
    baseStyle: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 2,
        flexDirection: 'column',
        height: '100%',
    },
});

export const StyledSlimPromotion = chakra('div', {
    baseStyle: {
        height: '400px',
    },
});
