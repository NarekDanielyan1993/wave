import { Box, chakra } from '@chakra-ui/react';

export const StyledIndicatorContainer = chakra(Box, {
    baseStyle: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 4,
    },
});

export const StyledIndicatorWrapper = chakra(Box, {
    baseStyle: {
        display: 'flex',
        justifyContent: 'center',
        gap: 2,
    },
});
