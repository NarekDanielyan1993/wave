import { Box } from '@chakra-ui/react';
import IconButton from '@components/button/icon-button';
import { StyledShoppingCartBadge } from './style';
const ShoppingCartBadge = ({ quantity }: { quantity: string | number }) => (
    <Box color="brand.common.white" pos="relative">
        <IconButton iconName="shop" />
        {Number(quantity) > 0 ? (
            <StyledShoppingCartBadge>{quantity}</StyledShoppingCartBadge>
        ) : null}
    </Box>
);

export default ShoppingCartBadge;
