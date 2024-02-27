import { Text, chakra } from '@chakra-ui/react';

export const StyledFooterContainer = chakra('footer', {
    baseStyle: {
        display: 'flex',
        width: '100%',
        marginTop: 'auto',
        py: '4',
        backgroundColor: `brand.common.black`,
    },
});

export const StyledFooterWrapper = chakra('div', {
    baseStyle: {
        width: '100%',
        maxWidth: '4xl',
        margin: '0 auto',
    },
});

export const StyledFooterTitle = chakra(Text, {
    baseStyle: {
        borderBottom: `1px solid`,
        borderBottomColor: 'brand.primary.main',
        marginBottom: '4',
        fontSize: '4xl',
        textAlign: 'center',
        fontWeight: 'semibold',
        color: 'brand.primary.main',
    },
});

export const StyledContentWrapper = chakra('div', {
    baseStyle: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        gap: 8,
        p: 8,
    },
});

export const StyledFooterLeft = chakra('div', {
    baseStyle: {
        display: 'flex',
        flexDirection: 'column',
        maxW: '20rem',
        w: 'full',
        flexShrink: 0,
    },
});

export const StyledFooterRight = chakra('div', {
    baseStyle: {
        display: 'flex',
        flexDirection: 'column',
        maxW: '20rem',
        w: 'full',
        flexShrink: 0,
    },
});
