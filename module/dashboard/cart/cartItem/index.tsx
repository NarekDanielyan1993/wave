import { Box, Button, Text } from '@chakra-ui/react';
import type { ICartsResponse } from 'types';
import { StyledCartWrapper } from './style';

const CartItem = ({
    cart,
    removeCartHandler,
}: {
    removeCartHandler: (id: string) => void;
    cart: ICartsResponse;
}) => (
    <StyledCartWrapper>
        <Box>
            <Text fontWeight="bold" mb={2}>
                Product name
            </Text>
            <Text>{cart.product.model}</Text>
        </Box>
        <Box>
            <Text fontWeight="bold" mb={2}>
                Price
            </Text>
            <Text>{cart.product.price}</Text>
        </Box>
        <Button
            alignSelf="center"
            onClick={() => removeCartHandler(cart.id)}
            variant="delete"
        >
            Remove
        </Button>
    </StyledCartWrapper>
);

export default CartItem;
