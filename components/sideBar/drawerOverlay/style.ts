import { Box, chakra } from '@chakra-ui/react';

export const StyledDrawerOverlay = chakra(Box, {
    baseStyle: {
        position: 'fixed',
        width: 'full',
        height: 'full',
        zIndex: 999,
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        transition: 'backgroundColor 1s ease',
    },
});
