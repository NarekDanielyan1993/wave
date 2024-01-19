import { AUTH_ROUTES } from '@constant/route';
import { SagaStore, wrapper } from '@store/create-store';
import { getSite } from '@store/site/action';
import { getUser } from '@store/user/action';
import { getUserPermissions } from '@store/userPermission/action';
import Account from 'module/dashboard/account';
import DashboardLayout from 'module/dashboard/dashboardLayout';
import { GetServerSidePropsContext } from 'next';
import { Session } from 'next-auth';
import { getSession } from 'next-auth/react';
import { END } from 'redux-saga';
import { CustomNextPage } from 'types';

const AccountPage: CustomNextPage = () => (
    <DashboardLayout rightSideTitle="overview">
        <Account />
    </DashboardLayout>
);

AccountPage.requiredAuth = true;

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
            store.dispatch(getUser({ email: session.user.email }));
            store.dispatch(
                getUserPermissions({
                    role: session.user.role,
                })
            );
            store.dispatch(END);
            await store.sagaTask?.toPromise();
            return {
                props: { session },
            };
        }
);

export default AccountPage;
