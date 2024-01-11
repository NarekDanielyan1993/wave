import { chakra } from '@chakra-ui/react';

export const StyledNavigation = chakra('nav', {
    baseStyle: {
        display: 'flex',
        flexDirection: 'column',
        flexBasis: 'xl',
        width: 'full',
        border: `1px solid`,
        borderColor: 'brand.common.white',
    },
});

export const StyledLayoutNavLinkList = chakra('div', {
    baseStyle: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        paddingRight: 'sm',
        gap: 'sm',
    },
});
