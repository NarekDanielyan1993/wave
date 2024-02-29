import Product from './product';

const ProductDetail = ({
    addToCartHandler,
}: {
    addToCartHandler: (productId: string) => void;
}) => <Product addToCartHandler={addToCartHandler} />;

export default ProductDetail;
