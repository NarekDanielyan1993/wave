import { getAuth } from '@api/auth/[...nextauth]';
import { SHOP_ROUTE } from '@constant/route';
import { createAuthSignInPromise } from '@store/auth/action';
import { authSelector } from '@store/auth/selectors';
import {
    SagaStore,
    useAppDispatch,
    useAppSelector,
    wrapper,
} from '@store/create-store';
import { getSite } from '@store/site/siteAction';
import { AuthSignInTypes } from 'common/validation/auth';
import SignInModule from 'module/auth/signIn';
import type { GetServerSidePropsContext } from 'next';
import { useRouter } from 'next/router';
import { useCallback } from 'react';
import { END } from 'redux-saga';
import type { CustomNextPage } from 'types';

const SignInPage: CustomNextPage = () => {
    const dispatch = useAppDispatch();
    const { isLoading } = useAppSelector(authSelector);
    const router = useRouter();

    const formSubmitHandler = useCallback((data: AuthSignInTypes) => {
        dispatch(createAuthSignInPromise(data)).then(() => {
            router.push(SHOP_ROUTE);
        });
    }, []);

    return <SignInModule isLoading={isLoading} onSubmit={formSubmitHandler} />;
};

export const getServerSideProps = wrapper.getServerSideProps(
    (store: SagaStore) => async (ctx: GetServerSidePropsContext) => {
        const session = await getAuth(ctx.req, ctx.res);
        if (session) {
            return {
                redirect: {
                    destination: SHOP_ROUTE,
                    permanent: false,
                },
            };
        }
        store.dispatch(getSite());
        store.dispatch(END);
        await store.sagaTask?.toPromise();
        return {
            props: {
                session,
            },
        };
    }
);

SignInPage.requiredAuth = false;

export default SignInPage;
