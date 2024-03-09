import { HamburgerIcon } from '@chakra-ui/icons';
import {
    Button,
    Menu as ChakraMenu,
    IconButton,
    MenuButton,
    MenuItem,
    MenuList,
} from '@chakra-ui/react';
import Link from '@components/button/link';
import useGenerateNavLinks from '@hooks/useGenerateNavLinks';
import { useRouter } from 'next/router';
import { NavLinkTypes } from 'types';

const MobileMenMenuNavigation = () => {
    const { links, isAuth, ShoppingCartBadge } = useGenerateNavLinks();
    const { asPath } = useRouter();
    return (
        <ChakraMenu autoSelect={false}>
            {isAuth && (
                <Link
                    aria-current={
                        asPath === '/dashboard/account/cart'
                            ? 'page'
                            : undefined
                    }
                    href="/dashboard/account/cart"
                    marginLeft="auto"
                    variant="secondary"
                >
                    {ShoppingCartBadge}
                </Link>
            )}
            <MenuButton
                aria-label="Options"
                as={IconButton}
                color="white"
                icon={<HamburgerIcon />}
                variant="outline"
            />
            <MenuList rootProps={{ zIndex: 2 }}>
                {links?.map((link: NavLinkTypes, index: number) => {
                    if (link.type === 'link') {
                        return (
                            <MenuItem key={index}>
                                <Link
                                    aria-current={
                                        asPath === link.url ? 'page' : undefined
                                    }
                                    color="black"
                                    href={link.url}
                                    key={index}
                                    sx={{ width: '100%' }}
                                    variant="secondary"
                                >
                                    {link.text}
                                </Link>
                            </MenuItem>
                        );
                    }
                    return (
                        <MenuItem as="div" key={index}>
                            <Button
                                color="black"
                                key={index}
                                onClick={link.click}
                                sx={{ pl: '8px' }}
                                variant="ghost"
                            >
                                {link.text}
                            </Button>
                        </MenuItem>
                    );
                })}
            </MenuList>
        </ChakraMenu>
    );
};

export default MobileMenMenuNavigation;
