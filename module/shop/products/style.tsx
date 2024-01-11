import { chakra } from '@chakra-ui/react';

export const StyledSectionWrapper = chakra('div', {
    baseStyle: {
        display: 'flex',
        flexWrap: 'wrap',
        flexGrow: 1,
        gap: '12',
        width: '100%',
    },
});
