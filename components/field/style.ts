import { Input, chakra } from '@chakra-ui/react';
import Select from 'react-select';

export const StyledSelect = chakra(Select, {
    baseStyle: ({ theme }) => ({
        '& textarea': {
            resize: 'none',
        },
        '& label.Mui-focused': {
            color: theme.palette.primary.darker,
        },
        '& label': {
            color: theme.palette.primary.main,
        },
        '&:hover label': {
            color: theme.palette.primary.main,
        },
        '& .MuiOutlinedInput-root': {
            '& fieldset': {
                borderColor: theme.palette.primary.main,
            },
            '&:hover fieldset': {
                borderColor: theme.palette.primary.main,
            },
            '&.Mui-focused fieldset': {
                borderColor: theme.palette.primary.darker,
            },
        },
    }),
});

export const StyledInput = chakra(Input, {
    baseStyle: ({ theme }) => ({
        '& textarea': {
            resize: 'none',
        },
        '& label.Mui-focused': {
            color: theme.palette.primary.darker,
        },
        '& label': {
            color: theme.palette.primary.main,
        },
        '&:hover label': {
            color: theme.palette.primary.main,
        },
        '& .MuiOutlinedInput-root': {
            '& fieldset': {
                borderColor: theme.palette.primary.main,
            },
            '&:hover fieldset': {
                borderColor: theme.palette.primary.main,
            },
            '&.Mui-focused fieldset': {
                borderColor: theme.palette.primary.darker,
            },
        },
    }),
});

export const StyledFileInput = chakra('input', {
    baseStyle: ({ theme }) => ({
        '& textarea': {
            resize: 'none',
        },
        '& label.Mui-focused': {
            color: theme.palette.primary.darker,
        },
        '& label': {
            color: theme.palette.primary.main,
        },
        '&:hover label': {
            color: theme.palette.primary.main,
        },
        '& .MuiOutlinedInput-root': {
            '& fieldset': {
                borderColor: theme.palette.primary.main,
            },
            '&:hover fieldset': {
                borderColor: theme.palette.primary.main,
            },
            '&.Mui-focused fieldset': {
                borderColor: theme.palette.primary.darker,
            },
        },
    }),
});

export const StyledErrorText = chakra('span', {
    baseStyle: ({ theme }) => ({
        color: theme.palette.error,
        mb: theme.spacing(0.5),
        mr: theme.spacing(0.5),
    }),
});
