import { ChakraProvider } from '@chakra-ui/react';
import Notification from '@components/Notification';
import MainLayout from '@components/layout';
import { PageGuard } from '@components/pageGuard';
import { wrapper } from '@store/create-store';
import { SessionProvider } from 'next-auth/react';
import { Provider } from 'react-redux';
import 'react-toastify/dist/ReactToastify.css';
import theme from 'styles/theme';
import { IAppProps } from 'types';

const MyApp = ({ Component, pageProps: { session, ...rest } }: IAppProps) => {
    const { store, props } = wrapper.useWrappedStore(rest);
    const LayoutComponent = Component.layout || MainLayout;
    return (
        <Provider store={store}>
            <SessionProvider session={session}>
                <ChakraProvider theme={theme}>
                    {Component.requiredAuth ? (
                        <PageGuard>
                            <LayoutComponent>
                                <Component {...props} />
                            </LayoutComponent>
                        </PageGuard>
                    ) : (
                        <LayoutComponent>
                            <Component {...props} />
                        </LayoutComponent>
                    )}
                </ChakraProvider>
                <Notification />
            </SessionProvider>
        </Provider>
    );
};

export default MyApp;
