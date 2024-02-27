import { Text, chakra } from '@chakra-ui/react';

export const StyledDashboardHeader = chakra(Text, {
    baseStyle: {
        color: 'brand.common.black',
        textTransform: 'capitalize',
        fontSize: '4xl',
        fontWeight: 'bold',
        marginBottom: '4',
    },
});
