import { Show } from '@chakra-ui/react';
import MobileMenMenuNavigation from './MobileMenuNavigation';
import HeaderLogo from './headerLogo';
import Navigation from './navigationBar';
import { StyledHeader, StyledHeaderWrapper } from './style';

const Header = () => {
    return (
        <StyledHeader>
            <StyledHeaderWrapper>
                <HeaderLogo />
                <Show below="lg">
                    <MobileMenMenuNavigation />
                </Show>
                <Show above="lg">
                    <Navigation />
                </Show>
            </StyledHeaderWrapper>
        </StyledHeader>
    );
};

export default Header;
