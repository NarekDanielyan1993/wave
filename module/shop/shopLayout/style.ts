import { chakra } from '@chakra-ui/react';

export const StyledShopContainer = chakra('div', {
    baseStyle: {
        display: 'flex',
        gap: 4,
        flexGrow: 1,
        width: '100%',
        maxWidth: '8xl',
        my: '8',
        px: '3vw',
    },
});

export const StyledDashboardLeftSide = chakra('aside', {
    baseStyle: {
        display: 'flex',
        flexDirection: 'column',
        maxWidth: '3xs',
        width: '100%',
    },
});

export const StyledRightSide = chakra('section', {
    baseStyle: {
        display: 'flex',
        flexDirection: 'column',
        flexGrow: 1,
        gap: '8',
    },
});
