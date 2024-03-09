import { IProductCart } from 'types';
import CartItem from '../cartItem';

const CartList = ({
    removeCartHandler,
    cart,
}: {
    cart: IProductCart[];
    removeCartHandler: (product: IProductCart) => void;
}) =>
    cart.map(c => (
        <CartItem cart={c} key={c.id} removeCartHandler={removeCartHandler} />
    ));

export default CartList;
