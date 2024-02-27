import Sidebar from '@components/sideBar';
import { AUTH_ROUTES } from '@constant/route';
import { wrapper, type SagaStore } from '@store/create-store';
import { getFrets } from '@store/frets/action';
import { getSite } from '@store/site/action';
import { getUser } from '@store/user/action';
import { getUserPermissions } from '@store/userPermission/action';
import AdminFrets from 'module/dashboard/admin/products copy';
import DashboardLayout from 'module/dashboard/dashboardLayout';
import PageTitle from 'module/dashboard/dashboardLayout/pageTitle';
import type { GetServerSidePropsContext } from 'next';
import type { Session } from 'next-auth';
import { getSession } from 'next-auth/react';
import { END } from 'redux-saga';
import type { CustomNextPage } from 'types';

const AdminFretsPage: CustomNextPage = () => (
    <DashboardLayout sideBar={<Sidebar />}>
        <PageTitle>frets</PageTitle>
        <AdminFrets />
    </DashboardLayout>
);

AdminFretsPage.requiredAuth = true;

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
            store.dispatch(getUser({ email: session.user.email }));
            store.dispatch(
                getUserPermissions({
                    role: session.user.role,
                })
            );
            store.dispatch(getSite());
            store.dispatch(getFrets({ page: 0, limit: 10 }));
            store.dispatch(END);
            await store.sagaTask?.toPromise();
            return {
                props: { session },
            };
        }
);

export default AdminFretsPage;
