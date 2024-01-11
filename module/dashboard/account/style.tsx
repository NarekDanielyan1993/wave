import { chakra } from '@chakra-ui/react';

export const StyledAccountContentWrapper = chakra('div', {
    baseStyle: {
        display: 'flex',
        flexDirection: 'column',
        padding: '4',
        minHeight: '100',
        backgroundColor: 'brand.background.main',
        color: 'brand.primary.main',
    },
});
