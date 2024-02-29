import { Box, Button, Text } from '@chakra-ui/react';
import NumberInput from '@components/field/numberInput';
import ImageComponent from '@components/image';
import { useAppDispatch, useAppSelector } from '@store/create-store';
import { productsSelector } from '@store/products/selectors';
import { calculateTotal } from '@store/user/reducer';
import { withCurrency } from '@utils/helper';
import { IProductCart } from 'types';
import { StyledCartWrapper } from './style';

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
    const calculateTotalHandler = (value: '+' | '-') => {
        dispatch(calculateTotal({ productId: cart.id, sign: value }));
    };
    return (
        <StyledCartWrapper>
            <Box
                flexDir={{ base: 'column', md: 'row' }}
                display={{ base: 'flex' }}
                gap={4}
            >
                <Box
                    alignSelf={'center'}
                    pos="relative"
                    height="10rem"
                    w="10rem"
                >
                    <ImageComponent layout="fill" src={image?.url} />
                </Box>
                <Box
                    display={'flex'}
                    flexDir={{ base: 'column', sm: 'row' }}
                    flexGrow={1}
                    gap={4}
                    justifyContent="space-between"
                >
                    <Box>
                        <Text fontWeight="bold">Product name</Text>
                        <Text>{cart.model}</Text>
                        <Box my={4}>
                            <Text fontWeight="bold">Price</Text>
                            <Text>{withCurrency(cart.price)}</Text>
                        </Box>
                    </Box>
                    <Box display={'flex'} gap={6}>
                        <NumberInput
                            onChange={calculateTotalHandler}
                            value={cart.quantity}
                            width="10rem"
                        />
                        <Box>
                            <Text fontWeight="bold">Total</Text>
                            <Text>{withCurrency(cart.total)}</Text>
                        </Box>
                    </Box>
                </Box>
            </Box>
            <Button
                marginLeft={'auto'}
                onClick={() => removeCartHandler([cart.id])}
                variant="delete"
            >
                Remove
            </Button>
        </StyledCartWrapper>
    );
};

export default CartItem;
