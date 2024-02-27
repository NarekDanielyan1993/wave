import { Text, chakra } from '@chakra-ui/react';

export const StyledFileSelect = chakra('div', {
    baseStyle: {
        width: 'full',
        height: 24,
        py: 2,
        display: 'flex',
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        flexDir: 'column',
        alignContent: 'center',
        color: 'brand.secondary.main',
        bgColor: 'brand.background.main',
        fontSize: 'md',
        borderRadius: 4,
        cursor: 'pointer',
    },
});

export const StyledFileText = chakra(Text, {
    baseStyle: {
        color: 'brand.primary.main',
        fontSize: 'md',
    },
});

export const StyledFileLabels = chakra('div', {
    baseStyle: {
        width: 'full',
        display: 'flex',
        alignItems: 'center',
        flexWrap: 'wrap',
        fontSize: 'sm',
        gap: 2,
        justifyContent: 'center',
        overflowY: 'auto',
    },
});
