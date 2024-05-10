import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { IconButton as ChakraIconButton, Tooltip } from '@chakra-ui/react';
import CheckIcon from '@components/icons/checkIcon';
import CloseIcon from '@components/icons/closeIcon';
import GridOffIcon from '@components/icons/gridOffIcon';
import GridOnIcon from '@components/icons/gridOnIcon';
import HamburgerIcon from '@components/icons/hamburgerIcon';
import ShoppingCartIcon from '@components/icons/shoppingCart';
import TruckIcon from '@components/icons/truckIcon';
import GoogleIcon from 'public/google.svg';
import { IconButtonTypes, IconsTypes } from 'types';

export const IconButton = ({
    iconName,
    tooltipText = '',
    ...props
}: IconButtonTypes) => {
    const icons: IconsTypes = {
        shop: ShoppingCartIcon,
        burger: HamburgerIcon,
        close: CloseIcon,
        gridOff: GridOffIcon,
        gridOn: GridOnIcon,
        truck: TruckIcon,
        check: CheckIcon,
        google: GoogleIcon,
        view: ViewIcon,
        viewOff: ViewOffIcon,
    };

    const Icon = icons[iconName] ?? ViewIcon;

    return (
        <Tooltip label={tooltipText}>
            <ChakraIconButton
                aria-label="icon-button"
                icon={<Icon />}
                {...props}
            />
        </Tooltip>
    );
};

export default IconButton;
