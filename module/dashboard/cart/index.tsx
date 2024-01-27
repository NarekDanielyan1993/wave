import Carts from './carts';
import Payment from './payment';
import { StyledCart } from './style';

const Cart = () => (
    <StyledCart>
        <Carts />
        <Payment />
    </StyledCart>
);

export default Cart;
