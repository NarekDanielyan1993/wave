import DefaultLayout from '@components/layout/defaultLayout';
import { AUTH_ROUTES } from '@constant/route';
import { config } from '@utils/config';
import bcrypt from 'bcryptjs';
import Cookies from 'cookies';
import CompletionSignUp from 'module/auth/completionSignUp';
import { GetServerSidePropsContext } from 'next';
const Completion = () => <CompletionSignUp />;

Completion.layout = DefaultLayout;

export async function getServerSideProps(context: GetServerSidePropsContext) {
    const cookies = new Cookies(context.req, context.res);

    const authToken = cookies.get('authToken') || '';
    try {
        const isTokenValid = await bcrypt.compare(
            config.NEXTAUTH_SECRET as string,
            authToken
        );
        if (!isTokenValid) {
            return {
                redirect: {
                    destination: AUTH_ROUTES.BASE,
                    permanent: false,
                },
            };
        }

        return {
            props: {},
        };
    } catch (error) {
        return {
            redirect: {
                destination: AUTH_ROUTES.BASE,
                permanent: false,
            },
        };
    }
}

Completion.layout = DefaultLayout;

export default Completion;
