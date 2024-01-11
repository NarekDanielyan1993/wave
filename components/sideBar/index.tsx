import usePermissions from '@hooks/usePermissions';
import AdminMenu from './adminMenu';
import UserMenu from './userMenu';

const Sidebar = () => {
    const adminPagePermissions = usePermissions('adminPage');
    return (
        <>
            <UserMenu />
            {adminPagePermissions?.read && <AdminMenu />}
        </>
    );
};
export default Sidebar;
