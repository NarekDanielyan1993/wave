import DefaultLayout from '@components/layout/defaultLayout';
import { signUp } from '@store/auth/action';
import { authSelector } from '@store/auth/selectors';
import { useAppDispatch, useAppSelector } from '@store/create-store';
import { AuthTypes } from 'common/validation/auth';
import SignUpModule from 'module/auth/signUp';
import { GetServerSidePropsContext } from 'next';
import { getSession } from 'next-auth/react';
import { CustomNextPage, LayoutTypes } from 'types';

const SignUpPage: CustomNextPage = () => {
    const dispatch = useAppDispatch();
    const { isLoading } = useAppSelector(authSelector);

    const formSubmitHandler = (data: AuthTypes) => {
        dispatch(signUp(data));
    };

    return <SignUpModule isLoading={isLoading} onSubmit={formSubmitHandler} />;
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
    const session = await getSession(context);

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

SignUpPage.requiredAuth = false;

SignUpPage.layout<LayoutTypes> = DefaultLayout;

export default SignUpPage;
