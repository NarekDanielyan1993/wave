import DefaultLayout from '@components/layout/defaultLayout';
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
            config.NEXTAUTH_SECRET,
            authToken
        );
        if (!isTokenValid) {
            return {
                redirect: {
                    destination: '/',
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
                destination: '/',
                permanent: false,
            },
        };
    }
}

Completion.layout = DefaultLayout;

export default Completion;
