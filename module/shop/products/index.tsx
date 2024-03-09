import { Box, Button } from '@chakra-ui/react';
import IconButton from '@components/button/icon-button';
import CardList from '@components/card/cardList';
import { useAppDispatch, useAppSelector } from '@store/create-store';
import { getProducts } from '@store/products/action';
import { paginatedProductsSelector } from '@store/products/selectors';
import { addToCart } from '@store/user/action';
import { useCallback, useState } from 'react';
import type { AddToCartPayloadType } from 'types';
import { StyledSectionWrapper } from './style';

const Products = () => {
    const {
        paginationData: { filters, page, totalItems },
        isProductsLoading,
        products,
    } = useAppSelector(paginatedProductsSelector);
    const [isHomeGrid, setIsHomeGrid] = useState<boolean>(true);
    const dispatch = useAppDispatch();
    const getProductsHandler = useCallback(() => {
        dispatch(
            getProducts({
                limit: 4,
                filters,
                page: page + 1,
            })
        );
    }, [page, filters]);

    const addToCartHandler = useCallback(
        (data: AddToCartPayloadType) => {
            dispatch(addToCart(data));
        },
        [page, filters]
    );

    return (
        <>
            <StyledSectionWrapper>
                <Box display="flex" gap={2} justifyContent="right" py={2}>
                    <IconButton
                        fontSize="1rem"
                        iconName={isHomeGrid ? 'gridOn' : 'gridOff'}
                        onClick={() => setIsHomeGrid(prev => !prev)}
                    />
                </Box>
                <CardList
                    addToCartHandler={addToCartHandler}
                    cards={products}
                    type={isHomeGrid ? 'home' : 'shop'}
                />
                {products.length < totalItems ? (
                    <Box display="block" sx={{ textAlign: 'center', mt: 10 }}>
                        <Button
                            isLoading={isProductsLoading}
                            onClick={getProductsHandler}
                            variant="tertiary"
                        >
                            Load More
                        </Button>
                    </Box>
                ) : null}
            </StyledSectionWrapper>
        </>
    );
};

export default Products;
