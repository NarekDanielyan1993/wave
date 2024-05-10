import { Box, FormControl, FormLabel, Input, chakra } from '@chakra-ui/react';

export const StyledSelect = chakra(Box, {
    baseStyle: {
        mb: 8,
    },
});

export const StyledFormLabel = chakra(FormLabel, {
    baseStyle: {
        position: 'absolute',
        top: '50%',
        zIndex: 1,
        marginInline: '3',
        paddingInline: '1',
        transform: 'translateY(-50%)',
        fontSize: 'md',
        color: 'black',
        pointerEvents: 'none',
        transition: '0.5s ease',
    },
});

export const StyledLabel = chakra(FormLabel, {
    baseStyle: {
        position: 'absolute',
        top: '15%',
        zIndex: 1,
        marginInline: '3',
        paddingInline: '1',
        transform: 'translateY(-50%)',
        fontSize: 'md',
        color: 'black',
        pointerEvents: 'none',
        transition: '0.5s ease',
    },
});

export const StyledInput = chakra(Input, {
    baseStyle: {
        border: '1px solid',
        width: 'full',
        color: 'brand.primary.darken',
        borderColor: 'brand.primary.main',
        borderRadius: '4px',
        '&:focus ~ label, &:not(:placeholder-shown) ~ label': {
            top: 0,
            backgroundColor: 'brand.common.white',
            fontSize: 'sm',
        },
        _focus: {
            border: '2px solid',
            boxShadow: 'none',
            borderColor: 'brand.primary.darken',
        },

        _invalid: {
            borderColor: 'red',
        },
    },
});

export const StyledFormControl = chakra(FormControl, {
    baseStyle: {
        mb: 1,
        position: 'relative',
    },
});

export const StyledFileInput = chakra('input', {
    baseStyle: {
        width: 'full',
        '&::file-selector-button': {
            display: 'flex',
            width: 'full',
            alignItems: 'center',
            justifyContent: 'center',
            padding: `2`,
            backgroundColor: 'brand.secondary.main',
            color: '#fff',
            borderRadius: 1,
            cursor: 'pointer',
            transition: 'background-color 0.3s',
            border: 'none',
            outline: 'none',
        },
        '&::file-selector-button-text': {
            pointerEvents: 'none',
        },
    },
});

export const StyledErrorText = chakra('span', {
    baseStyle: {
        display: 'inline-flex',
        color: 'brand.error.main',
        fontSize: 'xs',
        ml: '2',
    },
});
