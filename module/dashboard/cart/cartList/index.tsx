import { IProductCard } from 'types/product';
import CartItem from '../cartItem';

const CartList = ({
    removeCartHandler,
    cart,
}: {
    cart: IProductCard[];
    removeCartHandler: (id: string[]) => void;
}) =>
    cart.map(c => (
        <CartItem cart={c} key={c.id} removeCartHandler={removeCartHandler} />
    ));

export default CartList;
