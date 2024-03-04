import { Box } from '@chakra-ui/react';
import ImageComponent from '@components/image';
import { useAppSelector } from '@store/create-store';
import { productsSelector } from '@store/products/selectors';
import ProductHeader from './productHeader';
import ProductRightSection from './productRightSection';
import { StyledProductWrapper } from './style';

const Product = ({
    addToCartHandler,
}: {
    addToCartHandler: (productId: string) => void;
}) => {
    const { product, images } = useAppSelector(productsSelector);
    const image = images.find(img => img.productId === product.id);
    return (
        <>
            <ProductHeader />
            <StyledProductWrapper
                alignItems="flex-start"
                flexDir={{ base: 'column', lg: 'row' }}
            >
                <Box
                    height="30rem"
                    maxWidth="full"
                    pos="relative"
                    width="140rem"
                >
                    <ImageComponent layout="fill" src={image?.url} />
                </Box>
                <ProductRightSection
                    addToCartHandler={addToCartHandler}
                    product={product}
                />
            </StyledProductWrapper>
        </>
    );
};

export default Product;
