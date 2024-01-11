import { Text, chakra } from '@chakra-ui/react';

export const StyledDashboardSideBarHeader = chakra(Text, {
    baseStyle: {
        textTransform: 'capitalize',
        fontSize: '4xl',
        fontWeight: 'bold',
        marginBottom: '4',
    },
});

export const StyledDashboardSideBarWrapper = chakra(Text, {
    baseStyle: {
        display: 'flex',
        flexDirection: 'column',
        gap: '12',
    },
});
