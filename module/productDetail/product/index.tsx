import { Box } from '@chakra-ui/react';
import ImageComponent from '@components/image';
import { useAppSelector } from '@store/create-store';
import { productsSelector } from '@store/products/selectors';
import ProductHeader from './productHeader';
import ProductRightSection from './productRightSection';
import { StyledProductWrapper } from './style';

const Product = () => {
    const { product } = useAppSelector(productsSelector);
    return (
        <>
            <ProductHeader />
            <StyledProductWrapper>
                <Box pos="relative" width="30%">
                    <ImageComponent layout="fill" src="" />
                </Box>
                <ProductRightSection product={product} />
            </StyledProductWrapper>
        </>
    );
};

export default Product;
