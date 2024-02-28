import { createAuthSignInPromise } from '@store/auth/action';
import { authSelector } from '@store/auth/selectors';
import {
    SagaStore,
    useAppDispatch,
    useAppSelector,
    wrapper,
} from '@store/create-store';
import { getSite } from '@store/site/action';
import type { AuthTypes } from 'common/validation/auth';
import SignInModule from 'module/auth/signIn';
import type { GetServerSidePropsContext } from 'next';
import { getSession } from 'next-auth/react';
import { END } from 'redux-saga';
import type { CustomNextPage } from 'types';

const SignInPage: CustomNextPage = () => {
    const dispatch = useAppDispatch();
    const { isLoading } = useAppSelector(authSelector);

    const formSubmitHandler = (data: AuthTypes) => {
        dispatch(createAuthSignInPromise(data));
    };

    return <SignInModule isLoading={isLoading} onSubmit={formSubmitHandler} />;
};

export const getServerSideProps = wrapper.getServerSideProps(
    (store: SagaStore) => async (ctx: GetServerSidePropsContext) => {
        const session = await getSession({ req: ctx.req });
        console.log(session);
        if (session) {
            return {
                redirect: {
                    destination: '/',
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
