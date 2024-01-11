import { Text, chakra } from '@chakra-ui/react';
import Link from '@components/button/link';

export const StyledSwitchToSignUpSignIn = chakra('div', {
    baseStyle: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        margin: `2`,
        color: 'brand.primary.main',
    },
});

export const StyledSwitchToText = chakra(Text, {
    baseStyle: {
        // color: 'brand.secondary.darken',
    },
});

export const StyledSwitchToLink = chakra(Link, {
    baseStyle: {
        // color: 'brand.secondary.darken',
        // textTransform: 'initial',
    },
});
