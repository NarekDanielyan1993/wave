import { PRODUCT_CARDS_QUERY_DEFAULT_PARAMS } from '@constant/default';
import { AUTH_ROUTES } from '@constant/route';
import { SagaStore, wrapper } from '@store/create-store';
import { getProductsByCreatedDate } from '@store/products/action';
import { getSite } from '@store/site/action';
import { getUser } from '@store/user/action';
import { getUserPermissions } from '@store/userPermission/action';
import DashboardLayout from 'module/dashboard/dashboardLayout';
import UserProfile from 'module/dashboard/userProfile';
import { GetServerSidePropsContext } from 'next';
import { Session } from 'next-auth';
import { getSession } from 'next-auth/react';
import { END } from 'redux-saga';
import { CustomNextPage } from 'types';

const UserProfilePage: CustomNextPage = () => (
    <DashboardLayout rightSideTitle="user information">
        <UserProfile />
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
            store.dispatch(getUser({ email: session.user.email }));
            store.dispatch(
                getUserPermissions({
                    role: session.user.role,
                })
            );
            store.dispatch(
                getProductsByCreatedDate({
                    ...PRODUCT_CARDS_QUERY_DEFAULT_PARAMS,
                })
            );
            store.dispatch(getSite());
            store.dispatch(END);
            await store.sagaTask?.toPromise();
            return {
                props: { session },
            };
        }
);

UserProfilePage.requiredAuth = true;

export default UserProfilePage;
