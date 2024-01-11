import { Text, chakra } from '@chakra-ui/react';

export const StyledHeaderLogo = chakra(Text, {
    baseStyle: {
        textTransform: 'uppercase',
        fontSize: '4xl',
        fontWeight: 'bold',
        color: 'brand.common.white',
        opacity: 0.5,
    },
});
