import { chakra } from '@chakra-ui/react';

export const StyledDashboardWrapper = chakra('div', {
    baseStyle: {
        display: 'flex',
        gap: '12',
        flexGrow: 1,
        width: '100%',
        maxWidth: '7xl',
        my: '8',
    },
});

export const StyledDashboardContainer = chakra('div', {
    baseStyle: {
        display: 'flex',
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
