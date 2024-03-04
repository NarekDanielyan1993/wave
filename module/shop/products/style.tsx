import { chakra } from '@chakra-ui/react';

export const StyledSectionWrapper = chakra('div', {
    baseStyle: {
        display: 'flex',
        flexDir: 'column',
        flexWrap: 'wrap',
        flexGrow: 1,
        gap: 6,
        px: '3vw',
        width: '100%',
    },
});
