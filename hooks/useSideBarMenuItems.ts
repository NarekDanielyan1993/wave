import { SideBarMenuItem, SideBarMenuSectionTypesUnion } from 'types';

const useSideBarMenuItems = (which: SideBarMenuSectionTypesUnion) => {
    const userMenuItems: SideBarMenuItem[] = [
        {
            text: 'My account',
            href: '/dashboard/account',
        },
        {
            text: 'User information',
            href: '/dashboard/profile',
        },
        {
            text: 'My cart',
            href: '/dashboard/cart',
        },
    ];
    const adminMenuItems: SideBarMenuItem[] = [
        {
            text: 'Products',
            href: '/dashboard/admin/products',
        },
        {
            text: 'Frets',
            href: '/dashboard/admin/frets',
        },
        {
            text: 'Manage sites',
            href: '/dashboard/site',
        },
    ];
    if (which === 'user') {
        return userMenuItems;
    }
    return adminMenuItems;
};

export default useSideBarMenuItems;
