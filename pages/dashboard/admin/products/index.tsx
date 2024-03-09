import { AUTH_ROUTES } from '@constant/route';
import { wrapper, type SagaStore } from '@store/create-store';
import { getFrets } from '@store/frets/action';
import { getBrands, getPaginatedProducts } from '@store/products/action';
import { getSite } from '@store/site/action';
import { getCarts, getUser } from '@store/user/action';
import { getUserPermissions } from '@store/userPermission/action';
import AdminProducts from 'module/dashboard/admin/products';
import DashboardLayout from 'module/dashboard/dashboardLayout';
import PageTitle from 'module/dashboard/dashboardLayout/pageTitle';
import type { GetServerSidePropsContext } from 'next';
import type { Session } from 'next-auth';
import { getSession } from 'next-auth/react';
import { END } from 'redux-saga';
import type { CustomNextPage } from 'types';

const AdminProductsPage: CustomNextPage = () => (
    <DashboardLayout>
        <PageTitle>products</PageTitle>
        <AdminProducts />
    </DashboardLayout>
);

AdminProductsPage.requiredAuth = true;

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
            store.dispatch(getUser({ id: session.user.id }));
            store.dispatch(
                getUserPermissions({
                    role: session.user.role,
                })
            );
            store.dispatch(getFrets({ page: 0, limit: 10 }));
            store.dispatch(getSite());
            store.dispatch(getCarts({ id: session.user.id }));
            store.dispatch(
                getPaginatedProducts({
                    limit: 10,
                    page: 0,
                })
            );
            store.dispatch(getBrands());
            store.dispatch(END);
            await store.sagaTask?.toPromise();
            return {
                props: { session },
            };
        }
);

export default AdminProductsPage;
