import { chakra } from '@chakra-ui/react';

export const StyledSectionWrapper = chakra('div', {
    baseStyle: {
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
        flexGrow: 1,
        gap: '12',
        mt: 8,
        width: '100%',
    },
});
