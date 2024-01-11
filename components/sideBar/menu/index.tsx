import { SideBarMenuItem } from 'types';
import MenuList from './menuList';
import { StyledList } from './style';

const Menu = ({ list }: { list: SideBarMenuItem[] }) => (
    <StyledList>
        <MenuList list={list} />
    </StyledList>
);

export default Menu;
