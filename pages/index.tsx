import { getAuth } from '@api/auth/[...nextauth]';
import { ProductCardsSection } from '@components/productCards';
import SlimPromotion from '@components/promotion/slimPromotion';
import SliderComponent from '@components/slider';
import { PRODUCT_CARDS_QUERY_DEFAULT_PARAMS } from '@constant/default';
import { SagaStore, useAppDispatch, wrapper } from '@store/create-store';
import {
    getProductsByCreatedDate,
    getProductsBySold,
} from '@store/products/productAction';
import { getSite, getSiteImages } from '@store/site/siteAction';
import { addToCart, getCarts, getUser } from '@store/user/action';
import { GetServerSidePropsContext } from 'next';
import { useCallback } from 'react';
import { END } from 'redux-saga';
import { AddToCartPayloadType } from 'types';

const Home = () => {
    const dispatch = useAppDispatch();
    const addToCartHandler = useCallback((data: AddToCartPayloadType) => {
        dispatch(addToCart(data));
    }, []);

    return (
        <>
            <SliderComponent />
            <ProductCardsSection
                addToCartHandler={addToCartHandler}
                title="latest guitars on the shop"
                which="latestProducts"
            />
            <SlimPromotion />
            <ProductCardsSection
                addToCartHandler={addToCartHandler}
                title="Bestselling guitars on the shop"
                which="bestSellingProducts"
            />
        </>
    );
};

export const getServerSideProps = wrapper.getServerSideProps(
    (store: SagaStore) => async (ctx: GetServerSidePropsContext) => {
        const session = await getAuth(ctx.req, ctx.res);
        if (session) {
            store.dispatch(getUser({ id: session.user.id }));
            store.dispatch(getCarts({ id: session.user.id }));
        }
        store.dispatch(
            getProductsBySold({
                ...PRODUCT_CARDS_QUERY_DEFAULT_PARAMS,
                sortBy: 'itemsSold',
            })
        );
        store.dispatch(
            getProductsByCreatedDate({
                ...PRODUCT_CARDS_QUERY_DEFAULT_PARAMS,
            })
        );
        store.dispatch(getSite());
        store.dispatch(getSiteImages());
        store.dispatch(END);
        await store.sagaTask?.toPromise();
        return {
            props: { session },
        };
    }
);

Home.requiredAuth = false;

export default Home;
