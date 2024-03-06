import { Box, Button, Flex } from '@chakra-ui/react';
import ImageComponent from '@components/image';
import { useAppDispatch, useAppSelector } from '@store/create-store';
import { productsSelector } from '@store/products/selectors';
import { calculateTotal } from '@store/user/reducer';
import { withCurrency } from '@utils/helper';
import { IProductCart } from 'types';
import CartItemQuantity from './cartItemQuantity';
import CartItemText from './cartItemText';
import {
    StyledCartItemContent,
    StyledCartItemImage,
    StyledCartWrapper,
} from './style';

const CartItem = ({
    cart,
    removeCartHandler,
}: {
    removeCartHandler: (id: string[]) => void;
    cart: IProductCart;
}) => {
    const { images } = useAppSelector(productsSelector);
    const image = images.find(img => img.productId === cart.id);
    const dispatch = useAppDispatch();
    const calculateTotalHandler = (type: '+' | '-') => {
        dispatch(calculateTotal({ productId: cart.id, type }));
    };
    return (
        <StyledCartWrapper>
            <Box display="flex" flexDir={{ base: 'column', md: 'row' }} gap={4}>
                <StyledCartItemImage>
                    <ImageComponent layout="fill" src={image?.url} />
                </StyledCartItemImage>
                <StyledCartItemContent flexDir={{ base: 'column', md: 'row' }}>
                    <Box>
                        <CartItemText text="Model">{cart.model}</CartItemText>
                        <CartItemText text="Price">
                            {withCurrency(cart.price)}
                        </CartItemText>
                    </Box>
                    <Flex gap={3}>
                        <CartItemQuantity
                            onChange={calculateTotalHandler}
                            value={cart.quantity}
                        />
                        <Box>
                            <CartItemText text="Total">
                                {withCurrency(cart.total)}
                            </CartItemText>
                        </Box>
                    </Flex>
                </StyledCartItemContent>
            </Box>
            <Button
                marginLeft="auto"
                onClick={() => removeCartHandler([cart.id])}
                variant="delete"
            >
                Remove
            </Button>
        </StyledCartWrapper>
    );
};

export default CartItem;
