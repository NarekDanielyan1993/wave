import { chakra } from '@chakra-ui/react';

export const StyledProductSearchForm = chakra('form', {
    baseStyle: {
        display: 'flex',
        flexDirection: 'column',
        maxWidth: 'xl',
        width: '100%',
        marginBlockEnd: '4',
    },
});
