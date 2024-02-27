import { Box, chakra } from '@chakra-ui/react';

export const StyledFileWrapper = chakra(Box, {
    baseStyle: {
        cursor: 'pointer',
        pos: 'relative',
        _hover: {
            '& > div': {
                opacity: 1,
            },
        },
    },
});

export const StyledFileWrapperImage = chakra('img', {
    baseStyle: {
        maxWidth: '100%',
        width: '100%',
        height: 'auto',
        aspectRatio: '1 / 1',
        objectFit: 'cover',
    },
});
export const StyledFileSelectImageOverlay = chakra(Box, {
    baseStyle: {
        alignItems: 'flex-start',
        bg: 'rgba(0,0,0,0.3)',
        display: 'flex',
        height: '100%',
        justifyContent: 'right',
        opacity: 0,
        p: 2,
        position: 'absolute',
        top: 0,
        transition: 'all 0.5s ease',
        width: '100%',
    },
});

export const StyledFileSelectImageRemove = chakra(Box, {
    baseStyle: {
        _hover: { bgColor: '#eee' },
        bgColor: 'brand.common.white',
        borderRadius: 'sm',
        cursor: 'pointer',
        display: 'inline-flex',
        padding: 2,
        transition: 'all 0.5s ease',
    },
});
