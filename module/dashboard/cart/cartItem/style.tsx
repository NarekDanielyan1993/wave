import { chakra } from '@chakra-ui/react';

export const StyledCartWrapper = chakra('div', {
    baseStyle: {
        width: '100%',
        display: 'flex',
        flexDir: 'column',
        p: '4',
        gap: 4,
        border: '1px solid lightgray',
    },
});
