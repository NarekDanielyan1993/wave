import { useAppSelector } from '@store/create-store';
import { productsSelector } from '@store/products/selectors';
import { usersSelector } from '@store/user/selectors';
import ProductHeader from './productHeader';
import ProductImage from './productImage';
import ProductSection from './productSection';
import { StyledProductWrapper } from './style';

const ProductDetail = ({
    addToCartHandler,
}: {
    addToCartHandler: (productId: string) => void;
}) => {
    const { product, images } = useAppSelector(productsSelector);
    const { isCartLoading } = useAppSelector(usersSelector);
    const image = images.find(img => img.productId === product.id);
    return (
        <>
            <ProductHeader />
            <StyledProductWrapper
                alignItems="flex-start"
                flexDir={{ base: 'column', lg: 'row' }}
            >
                <ProductImage url={image?.url as string} />
                <ProductSection
                    addToCartHandler={addToCartHandler}
                    isCartLoading={isCartLoading}
                    product={product}
                />
            </StyledProductWrapper>
        </>
    );
};

export default ProductDetail;
