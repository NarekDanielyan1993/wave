import { extendTheme } from '@chakra-ui/react';

export const theme = extendTheme({
    spacing(size: number) {
        return `${size}rem`;
    },
    palette: {
        primary: {
            main: '#4CAF50',
            darker: '#388E3C',
            lighter: '#81C784',
        },
        secondary: {
            main: '#2196F3',
        },
        error: {
            main: '#FF5722',
        },
        text: {
            primary: '#333',
            secondary: '#FFFFFF',
        },
        background: {
            main: '#8BC34A',
            secondary: 'lightgrey',
            paper: '#E8F5E9',
        },
        gradient: {
            primary: 'linear-gradient(to bottom left, #388E3C, #81C784)',
        },
        shadows: {
            none: 'none',
            sm: '0px 2px 4px rgba(0, 0, 0, 0.2)',
            md: '0px 4px 8px rgba(0, 0, 0, 0.2)',
            lg: '0px 8px 16px rgba(0, 0, 0, 0.2)',
            xl: '0px 16px 24px rgba(0, 0, 0, 0.2)',
            '2xl': '0px 32px 48px rgba(0, 0, 0, 0.2)',
        },
        textShadows: {
            primary: '0 3px 10px rgba(0, 0, 0, 0.5)',
        },
        transitions: {
            easing: {
                easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
                easeOut: 'cubic-bezier(0.0, 0, 0.2, 1)',
            },
            duration: {
                shorter: '.2s',
                longer: '.3s',
            },
        },
    },
});
