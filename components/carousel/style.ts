import { Box, chakra } from '@chakra-ui/react';

export const CarouselContainer = chakra(Box, {
    baseStyle: {
        position: 'relative',
        width: '100%',
        height: '100%',
    },
});

export const CarouselWrapper = chakra(Box, {
    baseStyle: {
        position: 'relative',
        width: '100%',
        height: '100%',
        display: 'flex',
        scrollbarWidth: 0,
        msOverflowStyle: 'none',
        '&::-webkit-scrollbar': {
            display: 'none',
        },
    },
});
