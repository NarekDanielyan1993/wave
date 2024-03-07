import { Box, Text } from '@chakra-ui/react';
import IconButton from '@components/button/icon-button';
import CardList from '@components/card/cardList';
import useObserver from '@hooks/useObserver';
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
    const [grid, setGrid] = useState<'home' | 'shop'>('home');
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

    const { sentinelRef } = useObserver({
        isEnabled: products.length < totalItems,
        callback: () => getProductsHandler(),
    });

    return (
        <>
            <StyledSectionWrapper>
                <Box display="flex" gap={2} justifyContent="right" py={2}>
                    <IconButton
                        fontSize="1rem"
                        iconName={grid === 'home' ? 'gridOn' : 'gridOff'}
                        onClick={() =>
                            setGrid(prev => (prev === 'home' ? 'shop' : 'home'))
                        }
                    />
                </Box>
                <CardList
                    addToCartHandler={addToCartHandler}
                    cards={products}
                    type={grid}
                />
                <Box
                    display="block"
                    ref={sentinelRef}
                    sx={{ textAlign: 'center', mt: 10 }}
                >
                    {isProductsLoading && <Text>Loading...</Text>}
                </Box>
            </StyledSectionWrapper>
        </>
    );
};

export default Products;
