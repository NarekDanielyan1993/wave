import { chakra } from '@chakra-ui/react';

export const StyledShopWrapper = chakra('div', {
    baseStyle: {
        display: 'flex',
        flexGrow: 1,
        width: '100%',
        maxWidth: '6xl',
        gap: 12,
        mx: `auto`,
        my: '8',
        px: '4',
    },
});

export const StyledShopLeftSide = chakra('aside', {
    baseStyle: {
        display: 'flex',
        flexDirection: 'column',
        maxWidth: '3xs',
        width: '100%',
    },
});

export const StyledShopRightSide = chakra('section', {
    baseStyle: {
        display: 'flex',
        flexDirection: 'column',
        flexGrow: 1,
    },
});
