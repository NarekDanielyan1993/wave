import Loader from '@components/loader';
import { SESSION_STATUS } from '@constant/auth';
import { AUTH_ROUTES } from '@constant/route';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export const PageGuard = ({
    children,
}: {
    children: React.ReactNode;
}): JSX.Element | undefined => {
    const router = useRouter();
    const { status } = useSession();
    useEffect(() => {
        if (!router.isReady) {
            return;
        }

        if (SESSION_STATUS.UNAUTHENTICATED === status) {
            router.push({
                pathname: AUTH_ROUTES.BASE,
                query: { returnUrl: router.asPath },
            });
        }
    }, [status, router]);

    if (status === SESSION_STATUS.AUTHENTICATED) {
        return <>{children}</>;
    }
    return <Loader fixed />;
};
