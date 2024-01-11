import { chakra } from '@chakra-ui/react';

export const StyledHeader = chakra('header', {
    baseStyle: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 'sm',
        px: '4',
        backgroundColor: 'brand.common.black',
    },
});

export const StyledHeaderWrapper = chakra('div', {
    baseStyle: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: '4',
        width: 'full',
        maxWidth: '4xl',
    },
});
