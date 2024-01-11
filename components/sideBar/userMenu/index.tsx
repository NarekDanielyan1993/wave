import useSideBarMenuItems from '@hooks/useSideBarMenuItems';
import Menu from '../menu';
import { StyledDashboardSideBarHeader } from '../style';

const UserMenu = () => {
    const menuItems = useSideBarMenuItems('user');
    return (
        <>
            <StyledDashboardSideBarHeader as="h3">
                my account
            </StyledDashboardSideBarHeader>
            <Menu list={menuItems} />
        </>
    );
};

export default UserMenu;
