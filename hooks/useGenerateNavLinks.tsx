import { SESSION_STATUS } from '@constant/auth';
import { AUTH_ROUTES } from '@constant/route';
import { signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import type { NavLinkTypes } from 'types';

const useGenerateNavLinks = () => {
    const { status } = useSession();
    const router = useRouter();
    let links = [
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
            text: 'Log In',
            url: AUTH_ROUTES.BASE,
            type: 'link',
        },
    ] as NavLinkTypes[];
    const navLinksUpperWithSignIn: NavLinkTypes[] = [
        {
            text: 'MY Cart',
            url: '/dashboard/cart',
            type: 'link',
        },
        {
            text: 'MY Account',
            url: '/dashboard/profile',
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
        },
    ];

    let navLinksUpper: NavLinkTypes[] = signOutNavLinksUpper;
    if (status === SESSION_STATUS.AUTHENTICATED) {
        navLinksUpper = navLinksUpperWithSignIn;
        links = [
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
            ...links,
        ];
        links.splice(links.length - 1, 1, {
            text: 'LOG OUT',
            url: '/',
            type: 'button',
            click: () =>
                signOut({ redirect: false }).then(() => {
                    router.push(AUTH_ROUTES.BASE);
                }),
        });
    }

    return { upperLinks: navLinksUpper, bottomLinks: navLinksBottom, links };
};

export default useGenerateNavLinks;
