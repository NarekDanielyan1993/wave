import { Text, chakra } from '@chakra-ui/react';

export const StyledFooterOngoingEventsWrapper = chakra('div', {
    baseStyle: {
        textTransform: 'uppercase',
        flex: '1 1 60%',
    },
});

export const StyledFooterOngoingEventsInfo = chakra('div', {
    baseStyle: {
        display: 'flex',
        flexGrow: 1.5,
    },
});

export const StyledFooterOngoingEventsInfoTitle = chakra(Text, {
    baseStyle: {
        marginBottom: '4',
        fontWeight: 'bold',
        textTransform: 'uppercase',
        fontSize: '2xl',
        color: 'brand.common.white',
    },
});

export const StyledFooterOngoingEventsInfoContent = chakra(Text, {
    baseStyle: {
        textTransform: 'uppercase',
        color: 'brand.common.white',
    },
});
