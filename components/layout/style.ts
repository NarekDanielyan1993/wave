import { chakra } from '@chakra-ui/react';

export const StyledLayoutWrapper = chakra('div', {
    baseStyle: {
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
    },
});
