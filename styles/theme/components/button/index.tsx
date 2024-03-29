import { defineStyleConfig } from '@chakra-ui/react';

const Button = defineStyleConfig({
    baseStyle: {
        py: '1',
        px: '2',
        borderRadius: 0,
        height: 'fit-content',
        textTransform: 'uppercase',
        fontWeight: 'semibold',
        transition: 'all 0.5s ease-out',
        border: 'none',
        width: 'fit-content',
    },
    variants: {
        primary: {
            bgColor: 'brand.secondary.main',
            color: 'brand.primary.lighten',
            _hover: {
                _disabled: {
                    bgColor: 'brand.secondary.darken',
                },
                bgColor: 'brand.secondary.main',
            },
        },
        primaryLight: {
            bgColor: 'brand.secondary.lighten',
            color: 'brand.primary.lighten',
            _hover: {
                _disabled: {
                    bgColor: 'brand.secondary.darken',
                },
                bgColor: 'brand.secondary.main',
            },
        },
        secondary: {
            bgColor: 'brand.primary.main',
            color: 'white',
            _hover: {
                _disabled: {
                    bgColor: 'brand.primary.darken',
                },
                bgColor: 'brand.primary.darken',
            },
        },
        tertiary: {
            bgColor: 'brand.tertiary.main',
            color: 'brand.common.black',
            _hover: {
                _disabled: {
                    bgColor: 'brand.tertiary.darken',
                    color: 'brand.common.black',
                },
                bgColor: 'brand.tertiary.darken',
                color: 'brand.common.black',
            },
        },
        ghost: {
            bgColor: 'transparent',
            color: 'white',
        },
        text: {
            bgColor: 'transparent',
            color: 'white',
            _hover: {
                color: 'brand.primary.main',
            },
        },
        pg: {
            bgColor: 'brand.primary.lighten',
            color: 'black',
            _hover: {
                color: 'brand.primary.lighten',
                bgColor: 'black',
            },
            _active: {
                bgColor: 'brand.secondary.main',
                color: 'white',
            },
        },
        iconPrimary: {
            p: '5px',
            backgroundColor: 'brand.primary.lighten',
            color: 'brand.primary.main',
            _hover: {
                _disabled: {
                    bgColor: 'brand.primary.darken',
                },
                bgColor: 'brand.primary.darken',
            },
        },
        delete: {
            bgColor: 'brand.error.main',
            color: 'brand.common.white',
            _hover: {
                bgColor: 'brand.error.darken',
            },
        },
        truncate: {
            color: 'brand.secondary.main',
            padding: 0,
            fontSize: 'xs',
        },
    },
});

export default Button;
