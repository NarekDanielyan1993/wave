import HeaderLogo from './headerLogo';
import Navigation from './navigationBar';
import { StyledHeader, StyledHeaderWrapper } from './style';
// TODO Move div to style.js file
const Header = () => (
    <StyledHeader>
        <StyledHeaderWrapper>
            <HeaderLogo />
            <Navigation />
        </StyledHeaderWrapper>
    </StyledHeader>
);

export default Header;
