import { Session } from 'next-auth';
import type { AppProps } from 'next/app';
export type IAppProps = AppProps & {
    session: Session;
    Component: {
        requiredAuth?: boolean;
    };
};
