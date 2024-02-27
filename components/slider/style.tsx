import { chakra } from '@chakra-ui/react';

export const StyledPromotionContainer = chakra('div', {
    baseStyle: {
        display: 'flex',
        flexDir: 'column',
        alignItems: 'flex-start',
        gap: 2,
        position: 'absolute',
        top: '65%',
        left: '5%',
        transform: 'translateY(-50%)',
    },
});
