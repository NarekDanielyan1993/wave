import { Text, chakra } from '@chakra-ui/react';

export const StyledBusinessInfoContent = chakra('div', {
    baseStyle: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
});

export const StyledBusinessInfoTitle = chakra(Text, {
    baseStyle: {
        display: 'flex',
        marginBottom: '4',
        fontSize: '2xl',
        fontWeight: 'bold',
        color: 'brand.primary.main',
    },
});

export const StyledFooterContactsReachOut = chakra('div', {
    baseStyle: {
        display: 'flex',
        flexDirection: 'column',
        gap: '4',
    },
});
