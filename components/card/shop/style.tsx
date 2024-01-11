import { Text, chakra } from '@chakra-ui/react';

export const StyledShopCardContainer = chakra('div', {
    baseStyle: {
        width: '100%',
        maxWidth: '40rem',
        minHeight: '15',
        display: 'flex',
        boxShadow: 'sm',
        border: `1px solid lightgray`,
        alignItems: 'flex-start',
    },
});

export const StyledShopCardContentWrapper = chakra('div', {
    baseStyle: {
        display: 'flex',
        flexDirection: 'column',
        gap: 1,
        flexGrow: 2,
        minHeight: '15rem',
    },
});

export const StyledShopCardTitle = chakra('div', {
    baseStyle: {
        display: 'flex',
        fontSize: '2xl',
        padding: 0.8,
        fontWeight: 'bold',
        borderBottom: `1px solid lightgray`,
    },
});

export const StyledShopCardTitleText = chakra(Text, {
    baseStyle: {
        color: 'brand.common.black',
    },
});

export const StyledShopCardTitleBrandText = chakra(Text, {
    baseStyle: {
        color: 'brand.secondary.main',
    },
});

export const StyledShopCardImage = chakra('div', {
    baseStyle: {
        flexGrow: 1,
        position: 'relative',
    },
});

export const StyledShopCardContent = chakra('div', {
    baseStyle: {
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        padding: `0 0.5rem`,
    },
});

export const StyledCardText = chakra('div', {
    baseStyle: {
        color: 'brand.common.black',
    },
});

export const StyledShopCardActions = chakra(Text, {
    baseStyle: {
        display: 'flex',
        justifyContent: 'flex-end',
        marginTop: 'auto',
        gap: 1,
        p: 2,
    },
});
