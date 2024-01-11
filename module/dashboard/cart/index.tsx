import { Box } from '@chakra-ui/react';
import { useAppDispatch, useAppSelector } from '@store/create-store';
import { removeCart } from '@store/user/action';
import { usersSelector } from '@store/user/selectors';
import { calculateTotal } from '@utils/helper';
import CartList from './cartList';

const Cart = () => {
    const dispatch = useAppDispatch();
    const removeCartHandler = (id: string) => {
        dispatch(removeCart({ id }));
    };
    const { cart } = useAppSelector(usersSelector);
    return (
        <>
            <CartList cart={cart} removeCartHandler={removeCartHandler} />
            <Box>{`Total Amount: $${calculateTotal(cart)}`}</Box>
        </>
    );
};

export default Cart;
