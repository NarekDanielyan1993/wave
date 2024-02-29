import { Divider } from '@chakra-ui/react';
import useGenerateNavLinks from '@hooks/useGenerateNavLinks';
import NavLinkList from './navLinkList';
import { StyledNavigation } from './style';

const Navigation = () => {
    const { upperLinks, bottomLinks } = useGenerateNavLinks();
    return (
        <StyledNavigation>
            <NavLinkList list={upperLinks} />
            <Divider orientation="horizontal" />
            <NavLinkList list={bottomLinks} />
        </StyledNavigation>
    );
};

export default Navigation;
