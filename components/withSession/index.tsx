/* eslint-disable react/function-component-definition */
import Loader from '@components/loader';
import { SESSION_STATUS } from '@constant/auth';
import { useSession } from 'next-auth/react';

export function WithSession<P extends object>(
    Component: React.ComponentType<P>
) {
    return function Layout(props: P) {
        const { status, data: session } = useSession();
        return status === SESSION_STATUS.LOADING ||
            status === SESSION_STATUS.UNAUTHENTICATED ? (
            <Loader />
        ) : (
            <Component {...props} />
        );
    };
}
export default WithSession;
