import { AUTH_ROUTES } from '@constant/route';
import { wrapper, type SagaStore } from '@store/create-store';
import { getSite, getSiteImages } from '@store/site/siteAction';
import { getCarts } from '@store/user/action';
import { getUserPermissions } from '@store/userPermission/action';
import DashboardLayout from 'module/dashboard/dashboardLayout';
import Site from 'module/dashboard/site';
import type { GetServerSidePropsContext } from 'next';
import type { Session } from 'next-auth';
import { getSession } from 'next-auth/react';
import { END } from 'redux-saga';
import { CustomNextPage } from 'types';
import PageTitle from '../../../module/dashboard/dashboardLayout/pageTitle';

const SitePage: CustomNextPage = () => (
    <DashboardLayout>
        <PageTitle>Manage site</PageTitle>
        <Site />
    </DashboardLayout>
);

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
            store.dispatch(
                getUserPermissions({
                    role: session.user.role,
                })
            );
            store.dispatch(getSite());
            store.dispatch(getCarts({ id: session.user.id }));
            store.dispatch(getSiteImages());
            store.dispatch(END);
            await store.sagaTask?.toPromise();
            return {
                props: { session },
            };
        }
);

SitePage.requiredAuth = true;

export default SitePage;
