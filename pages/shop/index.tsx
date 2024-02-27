import { AUTH_ROUTES } from '@constant/route';
import { useAppDispatch, wrapper, type SagaStore } from '@store/create-store';
import { getFrets } from '@store/frets/action';
import {
    getBrands,
    getPaginatedProducts,
    getProducts,
} from '@store/products/action';
import { getSite } from '@store/site/action';
import { getCarts, getUser } from '@store/user/action';
import DashboardLayout from 'module/dashboard/dashboardLayout';
import Products from 'module/shop/products';
import ShopSideBar from 'module/shop/shopSideBar';
import type { GetServerSidePropsContext } from 'next';
import type { Session } from 'next-auth';
import { getSession } from 'next-auth/react';
import { END } from 'redux-saga';
import type { GetPaginatedProductsActionPayload } from 'types';

const ShopPage = () => {
    const dispatch = useAppDispatch();
    const filterProducts = (data: GetPaginatedProductsActionPayload) => {
        dispatch(getPaginatedProducts(data));
    };
    return (
        <DashboardLayout
            sideBar={<ShopSideBar filterProducts={filterProducts} />}
        >
            <Products />
        </DashboardLayout>
    );
};

ShopPage.requiredAuth = true;

export const getServerSideProps = wrapper.getServerSideProps(
    (store: SagaStore) =>
        async ({ req }: GetServerSidePropsContext) => {
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
            store.dispatch(getBrands());
            store.dispatch(getCarts({ id: session.user.id }));
            store.dispatch(getFrets({ page: 0, limit: 10 }));
            store.dispatch(getUser({ email: session.user.email }));
            store.dispatch(
                getProducts({
                    limit: 4,
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
