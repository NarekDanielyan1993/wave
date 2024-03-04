import { ProductCardsSection } from '@components/productCards';
import SlimPromotion from '@components/promotion/slimPromotion';
import SliderComponent from '@components/slider';
import { PRODUCT_MODEL_FIELDS } from '@constant/db';
import { PRODUCT_CARDS_QUERY_DEFAULT_PARAMS } from '@constant/default';
import { SagaStore, useAppDispatch, wrapper } from '@store/create-store';
import {
    getPaginatedProducts,
    getProductsByCreatedDate,
    getProductsBySold,
} from '@store/products/action';
import { getSite, getSiteImages } from '@store/site/action';
import { addToCart, getUser } from '@store/user/action';
import { GetServerSidePropsContext } from 'next';
import { getSession } from 'next-auth/react';
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
                which="bestSellingProducts"
            />
            <SlimPromotion />
            <ProductCardsSection
                addToCartHandler={addToCartHandler}
                title="latest guitars on the shop"
                which="latestProducts"
            />
        </>
    );
};

export const getServerSideProps = wrapper.getServerSideProps(
    (store: SagaStore) => async (ctx: GetServerSidePropsContext) => {
        const session = await getSession({ req: ctx.req });
        store.dispatch(
            getProductsBySold({
                ...PRODUCT_CARDS_QUERY_DEFAULT_PARAMS,
                sortBy: PRODUCT_MODEL_FIELDS.ITEMSSOLD,
            })
        );
        store.dispatch(getUser({ email: session?.user.email }));
        store.dispatch(
            getProductsByCreatedDate({
                ...PRODUCT_CARDS_QUERY_DEFAULT_PARAMS,
            })
        );
        store.dispatch(
            getPaginatedProducts({
                limit: 10,
                page: 0,
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
