import { Box, Text } from '@chakra-ui/react';
import Loader from '@components/loader';
import { useAppDispatch, useAppSelector } from '@store/create-store';
import { removeCart } from '@store/user/action';
import { usersSelector } from '@store/user/selectors';
import { withCurrency } from '@utils/helper';
import { IProductCart } from 'types';
import CartList from '../cartList';

const Carts = () => {
    const dispatch = useAppDispatch();
    const removeCartHandler = (product: IProductCart) => {
        dispatch(removeCart({ product }));
    };
    const {
        cart: { products, subtotal },
        isCartLoading,
    } = useAppSelector(usersSelector);

    return (
        <Box display="flex" flexDir="column" flexGrow={1} gap={4}>
            {isCartLoading && <Loader fixed />}
            <CartList cart={products} removeCartHandler={removeCartHandler} />
            {products.length > 0 ? (
                <Box>{`Total Amount: ${withCurrency(subtotal)}`}</Box>
            ) : (
                <Text>There is nothing in your cart</Text>
            )}
        </Box>
    );
};

export default Carts;
