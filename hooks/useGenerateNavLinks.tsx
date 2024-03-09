import ShoppingCartBadge from '@components/badge/shoppingCartBadge';
import { SESSION_STATUS } from '@constant/auth';
import { AUTH_ROUTES } from '@constant/route';
import { useAppSelector } from '@store/create-store';
import { usersSelector } from '@store/user/selectors';
import { signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import type { NavLinkTypes } from 'types';

const useGenerateNavLinks = () => {
    const { status } = useSession();
    const router = useRouter();
    const {
        cart: { quantity },
    } = useAppSelector(usersSelector);

    let MobileNavlinks = [
        {
            text: 'Home',
            url: '/',
            type: 'link',
        },
        {
            text: 'Shop',
            url: '/shop',
            type: 'link',
        },
        {
            text: 'Log In',
            url: AUTH_ROUTES.BASE,
            type: 'link',
        },
    ] as NavLinkTypes[];

    const navLinksUpperWithSignIn: NavLinkTypes[] = [
        {
            text: <ShoppingCartBadge quantity={quantity} />,
            url: '/dashboard/account/cart',
            type: 'link',
        },
        {
            text: 'MY Account',
            url: '/dashboard/account/profile',
            type: 'link',
        },
        {
            text: 'LOG OUT',
            url: '/',
            type: 'button',
            click: () =>
                signOut({ redirect: false }).then(() => {
                    router.push(AUTH_ROUTES.BASE);
                }),
        },
    ];
    const navLinksBottom: NavLinkTypes[] = [
        {
            text: 'Home',
            url: '/',
            type: 'link',
        },
        {
            text: 'Shop',
            url: '/shop',
            type: 'link',
        },
    ];

    const signOutNavLinksUpper: NavLinkTypes[] = [
        {
            text: 'Log In',
            url: AUTH_ROUTES.BASE,
            type: 'link',
        },
    ];

    let navLinksUpper: NavLinkTypes[] = signOutNavLinksUpper;
    if (status === SESSION_STATUS.AUTHENTICATED) {
        navLinksUpper = navLinksUpperWithSignIn;
        MobileNavlinks = [
            {
                text: 'MY Account',
                url: '/dashboard/account/profile',
                type: 'link',
            },
            ...MobileNavlinks,
        ];
        MobileNavlinks.splice(MobileNavlinks.length - 1, 1, {
            text: 'LOG OUT',
            url: '/',
            type: 'button',
            click: () =>
                signOut({ redirect: false }).then(() => {
                    router.push(AUTH_ROUTES.BASE);
                }),
        });
    }

    return {
        isAuth: status === SESSION_STATUS.AUTHENTICATED,
        upperLinks: navLinksUpper,
        bottomLinks: navLinksBottom,
        links: MobileNavlinks,
        ShoppingCartBadge: <ShoppingCartBadge quantity={quantity} />,
    };
};

export default useGenerateNavLinks;
