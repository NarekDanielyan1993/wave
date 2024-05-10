import { signUp } from '@store/auth/action';
import { authSelector } from '@store/auth/selectors';
import {
    SagaStore,
    useAppDispatch,
    useAppSelector,
    wrapper,
} from '@store/create-store';
import { getSite } from '@store/site/action';
import { AuthSignUpTypes } from 'common/validation/auth';
import SignUpModule from 'module/auth/signUp';
import { GetServerSidePropsContext } from 'next';
import { getSession } from 'next-auth/react';
import { END } from 'redux-saga';
import { CustomNextPage } from 'types';

const SignUpPage: CustomNextPage = () => {
    const dispatch = useAppDispatch();
    const { isLoading } = useAppSelector(authSelector);

    const signUpFormHandler = (data: AuthSignUpTypes) => {
        dispatch(signUp(data));
    };

    return <SignUpModule isLoading={isLoading} onSubmit={signUpFormHandler} />;
};

export const getServerSideProps = wrapper.getServerSideProps(
    (store: SagaStore) => async (ctx: GetServerSidePropsContext) => {
        const session = await getSession({ req: ctx.req });
        store.dispatch(getSite());
        store.dispatch(END);
        await store.sagaTask?.toPromise();
        return {
            props: { session },
        };
    }
);

SignUpPage.requiredAuth = false;

export default SignUpPage;
