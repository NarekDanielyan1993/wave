import { Box, IconButton, Text } from '@chakra-ui/react';
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
                        color={grid === 'home' ? 'brand.secondary.main' : ''}
                        minW={0}
                        aria-label=""
                        icon={<MdOutlineGridOff />}
                        onClick={() => setGrid('home')}
                    />
                    <IconButton
                        color={grid === 'shop' ? 'brand.secondary.main' : ''}
                        minW={0}
                        aria-label=""
                        icon={<MdOutlineGridOn />}
                        onClick={() => setGrid('shop')}
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
