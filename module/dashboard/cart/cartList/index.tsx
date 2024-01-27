import type { ICartsResponse } from 'types';
import CartItem from '../cartItem';

const CartList = ({
    removeCartHandler,
    cart,
}: {
    cart: ICartsResponse[];
    removeCartHandler: (id: string[]) => void;
}) =>
    cart.map(c => (
        <CartItem
            cart={c}
            key={c.userId}
            removeCartHandler={removeCartHandler}
        />
    ));

export default CartList;
