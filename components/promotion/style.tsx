import { chakra } from '@chakra-ui/react';

export const StyledSliderLineOne = chakra('div', {
    baseStyle: {
        width: 'fit-content',
        padding: `1`,
        fontSize: '4xl',
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
