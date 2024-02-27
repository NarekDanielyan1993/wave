import { useMediaQuery } from '@chakra-ui/react';
import HeaderLogo from './headerLogo';
import Menu from './menu';
import Navigation from './navigationBar';
import { StyledHeader, StyledHeaderWrapper } from './style';
// TODO Move div to style.js file
const Header = () => {
    const [isLargerThan800] = useMediaQuery('(max-width: 800px)');
    return (
        <StyledHeader>
            <StyledHeaderWrapper>
                <HeaderLogo />
                {isLargerThan800 ? <Menu /> : <Navigation />}
            </StyledHeaderWrapper>
        </StyledHeader>
    );
};

export default Header;
