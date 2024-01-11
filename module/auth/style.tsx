import { Text, chakra } from '@chakra-ui/react';

// export const StyledAuthContainer = styled('div')(({ theme }) => ({
//     display: 'flex',
//     justifyContent: 'center',
//     alignItems: 'center',
//     margin: '0 auto',
//     height: '100vh',
// }));

export const StyledAuthContainer = chakra('div', {
    baseStyle: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
    },
});

export const StyledAuthWrapper = chakra('form', {
    baseStyle: {
        width: '100%',
        maxWidth: 'xl',
        margin: '0 auto',
        padding: '4',
        borderRadius: 'md',
        border: `1px solid`,
        borderTop: `3px solid`,
        borderColor: 'brand.primary.main',
    },
});

export const StyledAuthTitle = chakra(Text, {
    baseStyle: {
        marginBottom: '4',
        fontSize: '4xl',
        textAlign: 'center',
        color: 'brand.common.black',
        fontWeight: 'bold',
        textTransform: 'uppercase',
    },
});
