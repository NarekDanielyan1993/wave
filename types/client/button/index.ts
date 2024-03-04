import { ButtonProps, IconButtonProps, LinkProps } from '@chakra-ui/react';

export interface ILink extends LinkProps {
    href: string;
    renderAs?: string;
    className?: string;
    linkVariant?: string;
    children: React.ReactNode;
}

export type IconButtonSizes = 'sm' | 'md' | 'lg';
export type IconsTypes = Record<string, any>;
export type iconNameTypes =
    | 'shop'
    | 'burger'
    | 'close'
    | 'gridOff'
    | 'gridOn'
    | 'truck'
    | 'check';

export interface IconButtonTypes extends Partial<IconButtonProps> {
    title?: string;
    tooltipText?: string;
    iconName: iconNameTypes;
}

export interface ButtonTypes extends ButtonProps {
    renderAs?: string;
    buttonVariant?: string;
    children: React.ReactNode;
}
