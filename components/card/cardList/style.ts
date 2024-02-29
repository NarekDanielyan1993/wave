import { Box, chakra } from '@chakra-ui/react';

export const StyledCardList = chakra(Box, {
    baseStyle: {
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
        width: 'full',
        gap: 6,
    },
});
