import { Text, chakra } from '@chakra-ui/react';

export const StyledProductCardsContainer = chakra('div', {
    baseStyle: {
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        alignItems: 'center',
        my: '4',
    },
});

export const StyledProductCardsWrapper = chakra('div', {
    baseStyle: {
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
        width: '100%',
        alignItems: 'center',
        maxWidth: '6xl',
        gap: '4',
        margin: `0 auto`,
    },
});

export const StyledProductCardsTitle = chakra(Text, {
    baseStyle: {
        fontWeight: 'bold',
        fontSize: '2xl',
        textTransform: 'uppercase',
        marginBottom: '16',
    },
});
