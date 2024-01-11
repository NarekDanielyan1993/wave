import { Box, Text } from '@chakra-ui/react';
import CardList from '@components/card/cardList';
import useObserver from '@hooks/useObserver';
import { useAppDispatch, useAppSelector } from '@store/create-store';
import { getProducts } from '@store/products/action';
import { paginatedProductsSelector } from '@store/products/selectors';
import { addToCart } from '@store/user/action';
import { useCallback, useState } from 'react';
import { MdOutlineGridOff, MdOutlineGridOn } from 'react-icons/md';
import type { AddToCartPayloadType } from 'types';
import { StyledSectionWrapper } from './style';

const Products = () => {
    const {
        paginationData: { filters, page, totalItems, limit },
        isProductsLoading,
        products,
    } = useAppSelector(paginatedProductsSelector);
    const [grid, setGrid] = useState<'home' | 'shop'>('home');
    const dispatch = useAppDispatch();
    const getProduct = useCallback(() => {
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
        callback: () => getProduct(),
    });

    return (
        <>
            <Box display="flex" gap={2} justifyContent="right" py={2}>
                <MdOutlineGridOff onClick={() => setGrid('home')} />
                <MdOutlineGridOn onClick={() => setGrid('shop')} />
            </Box>
            <StyledSectionWrapper>
                <CardList
                    addToCartHandler={addToCartHandler}
                    cards={products}
                    type={grid}
                />
            </StyledSectionWrapper>
            <Box
                display="block"
                ref={sentinelRef}
                sx={{ textAlign: 'center', my: 10 }}
            >
                {isProductsLoading && <Text>Loading...</Text>}
            </Box>
        </>
    );
};

export default Products;
