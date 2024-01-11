import { chakra } from '@chakra-ui/react';

export const StyledCartWrapper = chakra('div', {
    baseStyle: {
        display: 'flex',
        justifyContent: 'space-between',
        width: '100%',
        p: '4',
        height: 140,
        border: '1px solid lightgray',
    },
});
