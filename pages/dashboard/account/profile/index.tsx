import { getAuth } from '@api/auth/[...nextauth]';
import { AUTH_ROUTES } from '@constant/route';
import { SagaStore, wrapper } from '@store/create-store';
import { getSite } from '@store/site/siteAction';
import { getCarts, getUser } from '@store/user/action';
import { getUserPermissions } from '@store/userPermission/action';
import DashboardLayout from 'module/dashboard/dashboardLayout';
import PageTitle from 'module/dashboard/dashboardLayout/pageTitle';
import UserProfile from 'module/dashboard/userProfile';
import { GetServerSidePropsContext } from 'next';
import { Session } from 'next-auth';
import { END } from 'redux-saga';
import { CustomNextPage } from 'types';

const UserProfilePage: CustomNextPage = () => (
    <DashboardLayout>
        <PageTitle>My Profile</PageTitle>
        <UserProfile />
    </DashboardLayout>
);

export const getServerSideProps = wrapper.getServerSideProps(
    (store: SagaStore) =>
        async ({ req, res }: GetServerSidePropsContext) => {
            const session: Session | null = await getAuth(req, res);
            if (!session) {
                return {
                    redirect: {
                        destination: AUTH_ROUTES.BASE,
                        permanent: false,
                    },
                };
            }
            store.dispatch(getUser({ id: session.user.id }));
            store.dispatch(getCarts({ id: session.user.id }));
            store.dispatch(getSite());
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

UserProfilePage.requiredAuth = true;

export default UserProfilePage;
