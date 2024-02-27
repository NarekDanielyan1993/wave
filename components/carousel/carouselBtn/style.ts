import { IconButton, chakra } from '@chakra-ui/react';

export const StyledCarouselBtn = chakra(IconButton, {
    baseStyle: {
        position: 'absolute',
        top: '50%',
        padding: 4,
        color: 'black',
        backgroundColor: 'white',
        borderRadius: '50%',
    },
});
