import { AUTH_ROUTES } from '@constant/route';
import { wrapper, type SagaStore } from '@store/create-store';
import { getSite } from '@store/site/action';
import { getCarts } from '@store/user/action';
import Cart from 'module/dashboard/cart';
import DashboardLayout from 'module/dashboard/dashboardLayout';
import type { GetServerSidePropsContext } from 'next';
import type { Session } from 'next-auth';
import { getSession } from 'next-auth/react';
import { END } from 'redux-saga';

const CartPage = () => (
    <DashboardLayout rightSideTitle="Your Cart">
        <Cart />
    </DashboardLayout>
);

CartPage.requiredAuth = true;

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
            store.dispatch(
                getCarts({
                    id: session.user.id,
                })
            );
            store.dispatch(END);
            await store.sagaTask?.toPromise();
            return {
                props: { session },
            };
        }
);

export default CartPage;
