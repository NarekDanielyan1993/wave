import { AUTH_ROUTES } from '@constant/route';
import { wrapper, type SagaStore } from '@store/create-store';
import {
    getPaginatedProducts,
    getProduct,
} from '@store/products/productAction';
import { getSite } from '@store/site/siteAction';
import { addToCart, getCarts } from '@store/user/action';
import ProductDetail from 'module/productDetail';
import type { GetServerSidePropsContext } from 'next';
import type { Session } from 'next-auth';
import { getSession, useSession } from 'next-auth/react';
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { END } from 'redux-saga';

const ProductDetailPage = () => {
    const dispatch = useDispatch();
    const { data: session } = useSession();
    const addToCartHandler = useCallback((productId: string) => {
        dispatch(addToCart({ productId, userId: session?.user.id as string }));
    }, []);

    return <ProductDetail addToCartHandler={addToCartHandler} />;
};

export default ProductDetailPage;

ProductDetailPage.requiredAuth = true;

export const getServerSideProps = wrapper.getServerSideProps(
    (store: SagaStore) =>
        async ({ req, params }: GetServerSidePropsContext) => {
            const id = params?.productDetail as string;
            const session: Session | null = await getSession({ req });
            if (!session) {
                return {
                    redirect: {
                        destination: AUTH_ROUTES.BASE,
                        permanent: false,
                    },
                };
            }
            store.dispatch(getSite());
            store.dispatch(getCarts({ id: session.user.id }));
            store.dispatch(getProduct({ id }));
            store.dispatch(
                getPaginatedProducts({
                    limit: 10,
                    page: 0,
                })
            );
            store.dispatch(END);
            await store.sagaTask?.toPromise();
            return {
                props: { session },
            };
        }
);
