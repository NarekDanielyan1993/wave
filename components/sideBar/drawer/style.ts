import { chakra } from '@chakra-ui/react';

export const StyledDrawer = chakra('div', {
    baseStyle: {
        position: 'absolute',
        display: 'flex',
        flexDir: 'column',
        width: 'full',
        top: 0,
        zIndex: 1200,
        backgroundColor: 'white',
        paddingTop: '1rem',
    },
});
