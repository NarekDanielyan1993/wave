import {
    withDefaultColorScheme,
    withDefaultProps,
    withDefaultSize,
    withDefaultVariant,
} from '@chakra-ui/react';

const withDefaultStyles = [
    withDefaultColorScheme({ colorScheme: 'brand' }),
    withDefaultProps({
        defaultProps: {
            variant: 'ghost',
        },
        components: ['Button', 'Link'],
    }),
    withDefaultVariant({
        variant: 'outline',
        components: ['Input'],
    }),
    withDefaultSize({
        size: 'md',
        components: ['Button', 'Link', 'Input'],
    }),
];

export default withDefaultStyles;
