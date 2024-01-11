import { ThemeOverride, extendTheme } from '@chakra-ui/react';
import Button from './components/button';
import Link from './components/link';
import borderRadius from './foundations.tsx/borderRadius';
import breakpoints from './foundations.tsx/breakpoints';
import primaryColorSchema from './foundations.tsx/colors';
import fontSizes from './foundations.tsx/fontSizes';
import fontWeights from './foundations.tsx/fontWeights';
import sizes from './foundations.tsx/sizes';
import spacing from './foundations.tsx/spaces';
import globalStyles from './globalStyles';
import withDefaultStyles from './withDefaultStyles';

const theme: ThemeOverride = extendTheme(...withDefaultStyles, {
    space: spacing,
    sizes: { ...spacing, ...sizes },
    fontSizes,
    fontWeights,
    breakpoints,
    radii: borderRadius,
    colors: {
        ...primaryColorSchema,
    },
    components: {
        Button,
        Link,
        // Table: {
        //     variants: {
        //         mytable: {
        //             tr: {
        //                 _odd: {
        //                     background: 'green.500',
        //                 },
        //             },
        //             Tbody: {
        //                 height: '50px',
        //                 overflowY: 'auto',
        //             },
        //         },
        //     },
        // },
    },
    styles: {
        ...globalStyles,
    },
});

export type MainThemeTypes = typeof theme;

export default theme;
