import { Box, chakra } from '@chakra-ui/react';

export const StyledShoppingCartBadge = chakra(Box, {
    baseStyle: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        top: '-3px',
        fontSize: '14px',
        right: '-6px',
        w: '1.4rem',
        h: '1.4rem',
        borderRadius: '50%',
        textAlign: 'center',
        bgColor: 'red',
    },
});
