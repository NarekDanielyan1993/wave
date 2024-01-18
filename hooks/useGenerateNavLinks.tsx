import { SESSION_STATUS } from '@constant/auth';
import { AUTH_ROUTES } from '@constant/route';
import { signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import type { NavLinkTypes } from 'types';

const useGenerateNavLinks = () => {
    const { status, data: session } = useSession();
    const router = useRouter();
    const links = [
        {
            text: 'MY Cart',
            url: '/dashboard/cart',
            type: 'link',
        },
        {
            text: 'MY Account',
            url: '/dashboard/account',
            type: 'link',
        },
        {
            text: 'Home',
            url: '/',
            type: 'link',
        },
        {
            text: 'Guitars',
            url: '/shop',
            type: 'link',
        },
        {
            text: 'LOG OUT',
            url: '/',
            type: 'button',
            renderAs: 'text',
            click: () =>
                signOut({ redirect: false }).then(() => {
                    router.push(AUTH_ROUTES.BASE);
                }),
        },
    ];
    const navLinksUpperWithSignIn: NavLinkTypes[] = [
        {
            text: 'MY Cart',
            url: '/dashboard/cart',
            type: 'link',
        },
        {
            text: 'MY Account',
            url: '/dashboard/account',
            type: 'link',
        },
        {
            text: 'LOG OUT',
            url: '/',
            type: 'button',
            renderAs: 'text',
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
            text: 'Guitars',
            url: '/shop',
            type: 'link',
        },
    ];

    const signOutNavLinksUpper: NavLinkTypes[] = [
        {
            text: 'Log In',
            url: AUTH_ROUTES.BASE,
            type: 'link',
            renderAs: 'text',
        },
    ];

    let navLinksUpper: NavLinkTypes[] = signOutNavLinksUpper;
    if (status === SESSION_STATUS.AUTHENTICATED) {
        navLinksUpper = navLinksUpperWithSignIn;
    }

    return [navLinksUpper, navLinksBottom, links];
};

export default useGenerateNavLinks;
