import { chakra } from '@chakra-ui/react';

export const StyledSlimPromotionContainer = chakra('div', {
    baseStyle: {
        display: 'flex',
        alignItems: 'center',
        gap: '2',
        flexDirection: 'column',
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
    },
});

export const StyledSlimPromotion = chakra('div', {
    baseStyle: {
        position: 'relative',
        height: '300px',
    },
});
