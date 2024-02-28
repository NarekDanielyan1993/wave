import { Box, chakra } from '@chakra-ui/react';

export const StyledDrawerOverlay = chakra(Box, {
    baseStyle: {
        position: 'fixed',
        zIndex: 999,
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        backgroundColor: 'rgba(0,0,0,.5)',
        transition: 'all .5s ease',
    },
});
