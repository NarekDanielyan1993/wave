import { Box, chakra } from '@chakra-ui/react';

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

export const StyledCartItemContent = chakra('div', {
    baseStyle: {
        display: 'flex',
        flexGrow: 1,
        gap: 2,
        justifyContent: 'space-between',
    },
});

export const StyledCartItemImage = chakra(Box, {
    baseStyle: {
        alignSelf: 'center',
        height: '10rem',
        pos: 'relative',
        w: '10rem',
    },
});
