// import { extendTheme, withDefaultProps } from '@chakra-ui/react';

// export const theme = extendTheme(
//     withDefaultProps({
//         defaultProps: {
//             variant: 'outline',
//             size: 'md',
//             textTransform: 'uppercase',
//         },
//         components: ['Input', 'NumberInput', 'PinInput', 'Button'],
//     }),
//     {
//         spacing(size: number) {
//             return `${size}rem`;
//         },
//         palette: {
//             primary: {
//                 main: 'rgb(0, 0, 0)',
//                 darken: 'rgb(160, 160, 160)',
//                 lighter: 'rgb(245,245,245)',
//             },
//             secondary: {
//                 main: 'rgb(220,220,220)',
//                 darken: 'rgb(128, 128, 128)',
//             },
//             tertiary: {
//                 main: '	rgb(0,255,0)',
//                 darken: 'rgb(50,205,50)',
//             },
//             error: {
//                 main: '#FF5722',
//             },
//             text: {
//                 primary: {
//                     main: 'rgb(0,191,255)',
//                     darken: 'rgb(27, 130, 230)',
//                 },
//                 secondary: { main: '', darken: '#eeeeee' },
//                 tertiary: {
//                     main: 'rgb(255, 255, 102)',
//                     lighter: 'rgb(255, 250, 205)',
//                 },
//             },
//             common: {
//                 black: 'rgb(0, 0, 0)',
//                 darkenBlack: 'rgb(160, 160, 160)',
//                 lighterBlack: 'rgb(192,192,192)',
//                 white: 'rgb(255, 255, 255)',
//                 lighterWhite: 'rgb(238,238,238)',
//             },
//             background: {
//                 primary: {
//                     main: `rgb(105,105,105)`,
//                     lighter: `rgba(105,105,105, 0.7)`,
//                 },
//                 secondary: {
//                     main: `rgb(245,245,245)`,
//                     lighter: ``,
//                 },
//                 tertiary: {
//                     main: 'rgb(249, 199, 207)',
//                     lighter: `rgb(252,246,247)`,
//                     darker: `rgb(236, 227, 228)`,
//                 },
//             },
//             gradient: {
//                 primary: 'linear-gradient(to bottom left, #388E3C, #81C784)',
//             },
//             shadows: {
//                 none: 'none',
//                 sm: '0px 2px 4px rgba(0, 0, 0, 0.2)',
//                 md: '0px 4px 8px rgba(0, 0, 0, 0.2)',
//                 lg: '0px 8px 16px rgba(0, 0, 0, 0.2)',
//                 xl: '0px 16px 24px rgba(0, 0, 0, 0.2)',
//                 '2xl': '0px 32px 48px rgba(0, 0, 0, 0.2)',
//             },
//             transitions: {
//                 easing: {
//                     easeInOut: '.5s ease-out',
//                     easeOut: '.7s ease-in-out',
//                 },
//             },
//         },
//         fonts: {
//             body: 'system-ui, sans-serif',
//             heading: 'Georgia, serif',
//             mono: 'Menlo, monospace',
//         },
//         fontSizes: {
//             xs: '0.75rem',
//             sm: '0.875rem',
//             md: '1rem',
//             lg: '1.125rem',
//             xl: '1.25rem',
//             '2xl': '1.5rem',
//             '3xl': '1.875rem',
//             '4xl': '2.25rem',
//             '5xl': '3rem',
//             '6xl': '3.75rem',
//             '7xl': '4.5rem',
//             '8xl': '6rem',
//             '9xl': '8rem',
//         },
//         fontWeights: {
//             hairline: 100,
//             thin: 200,
//             light: 300,
//             normal: 400,
//             medium: 500,
//             semibold: 600,
//             bold: 700,
//             extrabold: 800,
//             black: 900,
//         },
//         breakpoints: {
//             base: '0em',
//             sm: '30em',
//             md: '48em',
//             lg: '62em',
//             xl: '80em',
//             '2xl': '96em',
//         },
//         textStyles: {
//             p: {
//                 base: {
//                     fontSize: 'lg',
//                     lineHeight: 'base',
//                 },
//                 sm: {
//                     fontSize: 'sm',
//                 },
//                 md: {
//                     fontSize: 'xl',
//                 },
//                 lg: {
//                     fontSize: '2xl',
//                 },
//                 xl: {
//                     fontSize: '3xl',
//                 },
//                 '2xl': {
//                     fontSize: '4xl',
//                 },
//             },
//             h1: {
//                 base: {
//                     fontSize: '4xl',
//                     fontWeight: 'bold',
//                     as: 'h1',
//                 },
//                 sm: {
//                     fontSize: '5xl',
//                 },
//                 md: {
//                     fontSize: '6xl',
//                     as: 'h1',
//                 },
//                 lg: {
//                     fontSize: '7xl',
//                     as: 'h1',
//                 },
//                 xl: {
//                     fontSize: '8xl',
//                     as: 'h1',
//                 },
//                 '2xl': {
//                     fontSize: '9xl',
//                 },
//             },
//             h2: {
//                 base: {
//                     fontSize: '3xl',
//                     fontWeight: 'semibold',
//                 },
//                 sm: {
//                     fontSize: '4xl',
//                 },
//                 md: {
//                     fontSize: '5xl',
//                 },
//                 lg: {
//                     fontSize: '6xl',
//                 },
//                 xl: {
//                     fontSize: '7xl',
//                 },
//                 '2xl': {
//                     fontSize: '8xl',
//                 },
//             },
//             h3: {
//                 base: {
//                     fontSize: '2xl',
//                     fontWeight: 'semibold',
//                 },
//                 sm: {
//                     fontSize: '3xl',
//                 },
//                 md: {
//                     fontSize: '4xl',
//                 },
//                 lg: {
//                     fontSize: '5xl',
//                 },
//                 xl: {
//                     fontSize: '6xl',
//                 },
//                 '2xl': {
//                     fontSize: '7xl',
//                 },
//             },
//             h4: {
//                 base: {
//                     fontSize: 'xl',
//                     fontWeight: 'semibold',
//                 },
//                 sm: {
//                     fontSize: '2xl',
//                 },
//                 md: {
//                     fontSize: '3xl',
//                 },
//                 lg: {
//                     fontSize: '4xl',
//                 },
//                 xl: {
//                     fontSize: '5xl',
//                 },
//                 '2xl': {
//                     fontSize: '6xl',
//                 },
//             },
//             h5: {
//                 base: {
//                     fontSize: 'lg',
//                     fontWeight: 'semibold',
//                 },
//                 sm: {
//                     fontSize: 'xl',
//                 },
//                 md: {
//                     fontSize: '2xl',
//                 },
//                 lg: {
//                     fontSize: '3xl',
//                 },
//                 xl: {
//                     fontSize: '4xl',
//                 },
//                 '2xl': {
//                     fontSize: '5xl',
//                 },
//             },
//             h6: {
//                 base: {
//                     fontSize: 'md',
//                     fontWeight: 'semibold',
//                 },
//                 sm: {
//                     fontSize: 'lg',
//                 },
//                 md: {
//                     fontSize: 'xl',
//                 },
//                 lg: {
//                     fontSize: '2xl',
//                 },
//                 xl: {
//                     fontSize: '3xl',
//                 },
//                 '2xl': {
//                     fontSize: '4xl',
//                 },
//             },
//         },
//         components: {},
//         styles: {
//             global: {
//                 body: {
//                     display: 'flex',
//                     height: '100dvh',
//                     flexDirection: 'column',
//                     a: {
//                         _hover: {
//                             textDecoration: 'none',
//                         },
//                     },
//                 },
//             },
//         },
//     }
// );
