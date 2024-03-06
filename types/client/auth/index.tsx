import {
    ButtonProps,
    ChakraComponent,
    ComponentWithAs,
} from '@chakra-ui/react';

export type SocialSignInProvidersTypes = 'google';

export interface ISocialSignInButtons {
    id: number;
    text: string;
    onClick: () => void;
    Icon: any;
    Component: ChakraComponent<ComponentWithAs<'button', ButtonProps>>;
}
