import { Text, chakra } from '@chakra-ui/react';

export const StyledShopCardContainer = chakra('div', {
    baseStyle: {
        width: '100%',
        maxWidth: '40rem',
        display: 'flex',
        flexDir: 'column',
        gap: 6,
        p: 4,
        borderRadius: '5px',
        boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2)',
        cursor: 'pointer',
        border: `1px solid lightgray`,
    },
});

export const StyledShopCardContentWrapper = chakra('div', {
    baseStyle: {
        pos: 'relative',
        display: 'flex',
        gap: 2,
    },
});

export const StyledShopCardTitle = chakra('div', {
    baseStyle: {
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

export const StyledShopCardPriceText = chakra(Text, {
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
        position: 'relative',
        width: '10rem',
        height: '10rem',
        flexShrink: 0,
    },
});

export const StyledShopCardContent = chakra('div', {
    baseStyle: {
        pos: 'relative',
        display: 'flex',
        flexDirection: 'column',
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
    },
});
