import { Box, chakra } from '@chakra-ui/react';

export const StyledDrawer = chakra(Box, {
    baseStyle: {
        pos: 'fixed',
        top: 0,
        left: 0,
        height: 'full',
        display: 'flex',
        flexDir: 'column',
        w: '60%',
        maxW: '25rem',
        p: '1rem',
        zIndex: 1031,
        overflowY: 'auto',
        touchAction: 'manipulation',
        backgroundColor: 'white',
        paddingTop: '1rem',
        transition: 'all 0.5s ease',
    },
});
