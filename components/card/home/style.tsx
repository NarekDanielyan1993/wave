import { Text, chakra } from '@chakra-ui/react';

export const StyledHomeCardContainer = chakra('div', {
    baseStyle: {
        overflowY: 'auto',
        maxHeight: 'xl',
        display: 'flex',
        flexDirection: 'column',
        gap: '4',
        width: '100%',
        maxWidth: '18rem',
        p: 4,
        borderRadius: '5px',
        boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2)',
        cursor: 'pointer',
    },
});

export const StyledHomeCardImage = chakra('div', {
    baseStyle: {
        height: '44',
        maxWidth: '100%',
        width: '100%',
        position: 'relative',
    },
});

export const StyledHomeCardTitle = chakra(Text, {
    baseStyle: {
        color: 'brand.secondary.main',
        fontSize: '24',
    },
});

export const StyledHomeCardContent = chakra('div', {
    baseStyle: {
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        gap: '4',
    },
});

export const StyledHomeCardText = chakra(Text, {
    baseStyle: {
        color: 'brand.common.black',
    },
});

export const StyledHomeCardActions = chakra('div', {
    baseStyle: {
        display: 'flex',
        gap: '4',
    },
});
