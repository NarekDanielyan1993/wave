import Carts from './carts';
import Payment from './payment';
import { StyledCart } from './style';

const Cart = () => (
    <StyledCart flexDir={{ base: 'column', xl: 'row' }}>
        <Carts />
        <Payment />
    </StyledCart>
);

export default Cart;
