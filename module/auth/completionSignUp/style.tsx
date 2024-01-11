import { Text, chakra } from '@chakra-ui/react';
import Link from '@components/button/link';

export const StyledSignUpCompletionContainer = chakra('div', {
    baseStyle: {
        display: 'flex',
        justifyContent: 'center',
        height: '100vh',
    },
});

export const StyledSignUpCompletionWrapper = chakra('div', {
    baseStyle: {
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'column',
        maxWidth: '2xl',
        width: '100%',
        mx: `auto`,
        my: '16',
        height: '100vh',
    },
});

export const StyledSignUpCompletionHeader = chakra(Text, {
    baseStyle: {
        textTransform: 'uppercase',
        fontWeight: 'bold',
        fontSize: '7xl',
        textAlign: 'center',
        marginBottom: '6',
    },
});

export const StyledSignUpCompletionText = chakra(Text, {
    baseStyle: {
        fontSize: 'md',
        fontWeight: 'semibold',
    },
});

export const StyledSignUpCompletionLink = chakra(Link, {
    baseStyle: {
        fontSize: 'md',
        color: 'brand.secondary.darken',
    },
});
