import { Box, chakra } from '@chakra-ui/react';

export const StyledDrawer = chakra(Box, {
    baseStyle: {
        pos: 'fixed',
        top: 0,
        left: 0,
        display: 'flex',
        flexDir: 'column',
        width: 'full',
        w: '60vw',
        maxW: '20rem',
        p: '1rem',
        zIndex: 1000,
        backgroundColor: 'white',
        paddingTop: '1rem',
        transition: 'all 0.5s ease',
    },
});
