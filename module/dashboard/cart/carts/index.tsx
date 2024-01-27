import { Box, Text } from '@chakra-ui/react';
import { useAppDispatch, useAppSelector } from '@store/create-store';
import { removeCart } from '@store/user/action';
import { usersSelector } from '@store/user/selectors';
import { calculateTotal } from '@utils/helper';
import CartList from '../cartList';

const Carts = () => {
    const dispatch = useAppDispatch();
    const removeCartHandler = (id: string[]) => {
        dispatch(removeCart({ id }));
    };
    const { cart } = useAppSelector(usersSelector);
    return (
        <Box display="flex" flexDir="column" flexGrow={1} gap={4}>
            <CartList cart={cart} removeCartHandler={removeCartHandler} />
            {cart.length > 0 && (
                <Box>{`Total Amount: $${calculateTotal(cart)}`}</Box>
            )}
            {cart.length < 1 && <Text>There is nothing in your cart</Text>}
        </Box>
    );
};

export default Carts;
