import { LayoutTypes } from 'types';
import Footer from './footer';
import Header from './header';
import { StyledLayoutWrapper } from './style';

const MainLayout = ({ children }: LayoutTypes) => (
    <StyledLayoutWrapper>
        <Header />
        <main>{children}</main>
        <Footer />
    </StyledLayoutWrapper>
);

export default MainLayout;
