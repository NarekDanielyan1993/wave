import { ChakraProvider, CSSReset } from '@chakra-ui/react';
import { AuthProvider } from '@components/auth-provider';
import { wrapper } from '@store/create-store';
import { SessionProvider } from 'next-auth/react';
import { Provider } from 'react-redux';
import { theme } from 'styles/theme';
import { IAppProps } from 'types';
import '../styles/globals.css';

const MyApp = ({ Component, session, ...rest }: IAppProps) => {
    const { store, props } = wrapper.useWrappedStore(rest);
    return (
        <ChakraProvider theme={theme}>
            <CSSReset />
            <Provider store={store}>
                <SessionProvider session={session}>
                    {Component.requiredAuth ? (
                        <AuthProvider>
                            <Component {...props.pageProps} />
                        </AuthProvider>
                    ) : (
                        <Component {...props.pageProps} />
                    )}
                </SessionProvider>
            </Provider>
        </ChakraProvider>
    );
};
export default MyApp;
