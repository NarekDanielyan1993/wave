import { getAuth } from '@api/auth/[...nextauth]';
import { useAppDispatch, wrapper, type SagaStore } from '@store/create-store';
import { getFrets } from '@store/frets/action';
import { getBrands, getPaginatedProducts } from '@store/products/productAction';
import { getSite } from '@store/site/siteAction';
import { getCarts, getUser } from '@store/user/action';
import Products from 'module/shop/products';
import ShopLayout from 'module/shop/shopLayout';
import type { GetServerSidePropsContext } from 'next';
import { type Session } from 'next-auth';
import { useCallback } from 'react';
import { END } from 'redux-saga';
import type { GetPaginatedProductsActionPayload } from 'types';

const ShopPage = () => {
    const dispatch = useAppDispatch();
    const filterProducts = useCallback(
        (data: GetPaginatedProductsActionPayload) => {
            dispatch(getPaginatedProducts(data));
        },
        []
    );

    return (
        <ShopLayout filterProducts={filterProducts}>
            <Products />
        </ShopLayout>
    );
};

ShopPage.requiredAuth = false;

export const getServerSideProps = wrapper.getServerSideProps(
    (store: SagaStore) =>
        async ({ req, res }: GetServerSidePropsContext) => {
            const session: Session | null = await getAuth(req, res);
            if (session) {
                store.dispatch(getCarts({ id: session.user.id }));
                store.dispatch(getUser({ id: session.user.id }));
            }
            store.dispatch(getSite());
            store.dispatch(getBrands());
            store.dispatch(getFrets({ page: 0, limit: 10 }));
            store.dispatch(
                getPaginatedProducts({
                    limit: 6,
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

export default ShopPage;
