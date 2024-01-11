import { chakra } from '@chakra-ui/react';

export const StyledPromotionContainer = chakra('div', {
    baseStyle: {
        display: 'flex',
        flexDir: 'column',
        alignItems: 'flex-start',
        gap: '2',
        position: 'absolute',
        top: '50%',
        left: '5%',
    },
});
