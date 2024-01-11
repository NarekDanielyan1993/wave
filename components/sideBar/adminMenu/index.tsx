import useSideBarMenuItems from '@hooks/useSideBarMenuItems';
import Menu from '../menu';
import { StyledDashboardSideBarHeader } from '../style';

const AdminMenu = () => {
    const menuItems = useSideBarMenuItems('admin');

    return (
        <>
            <StyledDashboardSideBarHeader as="h3">
                Admin
            </StyledDashboardSideBarHeader>
            <Menu list={menuItems} />
        </>
    );
};

export default AdminMenu;
