import { Text, chakra } from '@chakra-ui/react';

export const StyledDashboardWrapper = chakra('div', {
    baseStyle: {
        display: 'flex',
        gap: '12',
        flexGrow: 1,
        width: '100%',
        maxWidth: '5xl',
        mx: `auto`,
        my: '8',
        px: '4',
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

export const StyledDashboardHeader = chakra(Text, {
    baseStyle: {
        color: 'brand.common.black',
        textTransform: 'capitalize',
        fontSize: '4xl',
        fontWeight: 'bold',
        marginBottom: '4',
    },
});
