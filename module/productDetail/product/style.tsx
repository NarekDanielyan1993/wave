import { chakra } from '@chakra-ui/react';

export const StyledProductWrapper = chakra('div', {
    baseStyle: {
        display: 'flex',
        position: 'relative',
        minHeight: 'lg',
        maxWidth: '4xl',
        margin: '0 auto',
        p: 4,
    },
});
