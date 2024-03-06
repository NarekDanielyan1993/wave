import { Box, chakra } from '@chakra-ui/react';

export const StyledProfileImage = chakra(Box, {
    baseStyle: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDir: 'column',
        width: '200px',
        height: '200px',
        aspectRatio: 1,
        margin: '0 auto',
        position: 'relative',
        mb: 6,
        overflow: 'hidden',
        borderRadius: '50%',
        boxShadow: 'md',
    },
});
