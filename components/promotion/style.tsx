import { Text, chakra } from '@chakra-ui/react';

export const StyledSliderLineOne = chakra(Text, {
    baseStyle: {
        width: 'fit-content',
        padding: `1`,
        backgroundColor: 'brand.primary.darkenWithOpacity',
        color: 'white',
        textTransform: 'uppercase',
        fontWeight: 'bold',
    },
});

export const StyledSliderLineTwo = chakra(StyledSliderLineOne, {
    baseStyle: {
        fontWeight: 'normal',
    },
});
