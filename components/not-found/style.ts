import { WarningIcon } from '@chakra-ui/icons';
import { chakra } from '@chakra-ui/react';

export const StyledNotFound = chakra('div', {
    baseStyle: ({ theme }) => ({
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        width: '100%',
        backgroundColor: theme.colors.primary,
    }),
});

export const StyledNotFounWrapper = chakra('div', {
    baseStyle: ({ theme }) => ({
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        margin: '20px auto',
        padding: `${theme.spacing(3)} ${theme.spacing(6)}`,
        maxWidth: theme.spacing(50),
        border: '2px solid red',
        borderRadius: theme.spacing(0.5),
        textAlign: 'center',
    }),
});

export const StyledNotFoundText = chakra('p', {
    baseStyle: ({ theme }) => ({
        fontWeight: 'bold',
        marginTop: theme.spacing(2),
        color: theme.palette.text.primary,
        textAlign: 'center',
    }),
});

export const StyledNotFoundIcon = chakra(WarningIcon, {
    baseStyle: ({ theme }) => ({
        marginTop: theme.spacing(2),
        fontSize: '4rem',
        marginBottom: theme.spacing(1.5),
        color: theme.palette.text.secondary,
    }),
});
