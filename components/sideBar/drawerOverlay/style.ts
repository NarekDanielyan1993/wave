import { Box, chakra } from '@chakra-ui/react';

export const StyledDrawerOverlay = chakra(Box, {
    baseStyle: {
        position: 'fixed',
        width: 'full',
        height: 'full',
        zIndex: 1030,
        top: 0,
        left: 0,
        backgroundColor: 'rgba(45,47,49,.8)',
        transition: 'opacity 100ms linear',
    },
});
