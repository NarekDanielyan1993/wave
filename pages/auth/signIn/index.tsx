import { createAuthSignInPromise } from '@store/auth/action';
import { authSelector } from '@store/auth/selectors';
import { useAppDispatch, useAppSelector } from '@store/create-store';
import type { AuthTypes } from 'common/validation/auth';
import SignInModule from 'module/auth/signIn';
import type { GetServerSidePropsContext } from 'next';
import { getSession } from 'next-auth/react';
import type { CustomNextPage } from 'types';

const SignInPage: CustomNextPage = () => {
    const dispatch = useAppDispatch();
    const { isLoading } = useAppSelector(authSelector);

    const formSubmitHandler = (data: AuthTypes) => {
        dispatch(createAuthSignInPromise(data));
    };

    return <SignInModule isLoading={isLoading} onSubmit={formSubmitHandler} />;
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
    const session = await getSession({ req: context.req });
    console.log(session);
    if (session) {
        return {
            redirect: {
                destination: '/',
                permanent: false,
            },
        };
    }

    return {
        props: {
            session,
        },
    };
}

SignInPage.requiredAuth = false;

export default SignInPage;
