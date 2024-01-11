import { NextComponentType, NextPage } from 'next';
import { Session } from 'next-auth';
import type { AppProps } from 'next/app';

export type IAppProps = AppProps & {
    Component: CustomComponentProps & NextComponentType;
    pageProps: { session?: Session };
};

export type CustomComponentProps = {
    requiredAuth: boolean;
    layout?: <T extends object>(props: T) => JSX.Element;
};

export type CustomNextPage = NextPage & CustomComponentProps;
