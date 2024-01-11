import { chakra } from '@chakra-ui/react';

export const StyledOverviewWrapper = chakra('div', {
    baseStyle: {
        minHeight: 'max-content',
        maxHeight: '4xl',
        overflowY: 'auto',
    },
});
