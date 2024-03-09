import { SideBarMenuItem, SideBarMenuSectionTypesUnion } from 'types';

const useSideBarMenuItems = (which: SideBarMenuSectionTypesUnion) => {
    const userMenuItems: SideBarMenuItem[] = [
        {
            text: 'Profile',
            href: '/dashboard/account/profile',
        },
        {
            text: 'History',
            href: '/dashboard/account/history',
        },
        {
            text: 'Cart',
            href: '/dashboard/account/cart',
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
