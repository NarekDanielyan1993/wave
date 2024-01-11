import { Text } from '@chakra-ui/react';
import styled from '@emotion/styled';

export const StyledAuthContainer = styled('div')(({ theme }) => ({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    margin: '0 auto',
    height: '100vh',
}));

export const StyledAuthWrapper = styled('form')(({ theme }) => ({
    maxWidth: theme.spacing(40),
    width: '100%',
    borderRadius: theme.spacing(0.4),
    border: `1px solid ${theme.palette.secondary.main}`,
    borderTop: `3px solid ${theme.palette.secondary.darken}`,
    padding: theme.spacing(2),
}));

export const StyledAuthTitle = styled(Text)(({ theme }) => ({
    marginBottom: theme.spacing(1),
    fontSize: theme.fontSizes['2xl'],
    color: theme.palette.common.black,
    fontWeight: theme.fontWeights.semibold,
    textTransform: 'uppercase',
}));
