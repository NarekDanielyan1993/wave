import { authOptions } from '@api/auth/[...nextauth]';
import { useAppDispatch, wrapper, type SagaStore } from '@store/create-store';
import { getFrets } from '@store/frets/action';
import { getBrands, getPaginatedProducts } from '@store/products/action';
import { getSite } from '@store/site/action';
import { getCarts, getUser } from '@store/user/action';
import DashboardLayout from 'module/dashboard/dashboardLayout';
import Products from 'module/shop/products';
import ShopSideBar from 'module/shop/shopSideBar';
import type { GetServerSidePropsContext } from 'next';
import { getServerSession, type Session } from 'next-auth';
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
        <DashboardLayout
            sideBar={<ShopSideBar filterProducts={filterProducts} />}
        >
            <Products />
        </DashboardLayout>
    );
};

ShopPage.requiredAuth = false;

export const getServerSideProps = wrapper.getServerSideProps(
    (store: SagaStore) =>
        async ({ req, res }: GetServerSidePropsContext) => {
            const session: Session | null = await getServerSession(
                req,
                res,
                authOptions(req, res)
            );
            if (session) {
                store.dispatch(getCarts({ id: session.user.id }));
                store.dispatch(getUser({ email: session.user.email }));
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
