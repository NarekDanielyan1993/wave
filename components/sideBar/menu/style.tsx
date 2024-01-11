import { List, ListItem, chakra } from '@chakra-ui/react';

export const StyledMenuItem = chakra(ListItem, {
    baseStyle: {
        textTransform: 'capitalize',
        py: '2',
        borderBottom: '1px solid',
        borderBottomColor: 'brand.primary.lighten',
    },
});

export const StyledList = chakra(List, {
    baseStyle: {
        mb: '12',
    },
});
