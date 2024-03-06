import { Button, chakra } from '@chakra-ui/react';

export const StyledGoogleButton = chakra(Button, {
    baseStyle: {
        p: '1.5rem',
        borderWidth: '2px',
        borderRadius: '2px',
        borderStyle: 'solid',
        borderColor: 'brand.primary.main',
        color: 'brand.primary.main',
    },
});
