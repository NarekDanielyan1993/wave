import { IconButton as ChakraIconButton, Tooltip } from '@chakra-ui/react';
import ShoppingCart from 'public/shopping.svg';
import { IconButtonTypes, IconsTypes } from 'types';

export const IconButton = ({
    iconName,
    tooltipText = '',
    onClick,
    ...props
}: IconButtonTypes) => {
    const icons: IconsTypes = {
        shop: ShoppingCart,
    };
    const Icon = icons[iconName];
    return (
        <Tooltip title={tooltipText}>
            <ChakraIconButton
                {...props}
                aria-label="icon-button-cart"
                icon={<Icon />}
                onClick={onClick}
            />
        </Tooltip>
    );
};

export default IconButton;
