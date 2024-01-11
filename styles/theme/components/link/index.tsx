import { defineStyleConfig } from '@chakra-ui/react';

const Link = defineStyleConfig({
    baseStyle: {
        borderRadius: 0,
        textTransform: 'uppercase',
        fontWeight: 'semibold',
        border: 'none',
        transition: 'all 0.5s ease-out',
        px: '2',
        py: '1',
        _hover: {
            textDecoration: 'none',
        },
        _disabled: {
            backgroundColor: 'grey.100',
            borderColor: 'grey.100',
            color: 'grey.500',
            cursor: 'not-allowed',
        },
        _activeLink: {
            color: 'brand.secondary.main',
        },
    },
    variants: {
        primary: {
            bgColor: 'brand.tertiary.main',
            color: 'brand.common.black',
            _hover: {
                bgColor: 'brand.tertiary.darken',
            },
        },
        secondary: {
            color: 'brand.primary.main',
            p: '2',
            _hover: {
                color: 'brand.primary.darken',
            },
        },
        tertiary: {
            color: 'brand.secondary.main',
            p: '2',
            _hover: {
                color: 'brand.secondary.darken',
            },
        },
        ghost: {
            bgColor: 'transparent',
            color: 'white',
            _hover: {
                color: 'brand.primary.main',
            },
        },
    },
});

export default Link;
