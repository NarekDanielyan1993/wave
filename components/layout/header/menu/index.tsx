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
import { useAppSelector } from '@store/create-store';
import { usersSelector } from '@store/user/selectors';
import { useRouter } from 'next/router';
import { NavLinkTypes } from 'types';

const Menu = () => {
    const [upperLinks, bottomLinks, links] = useGenerateNavLinks();
    const { asPath } = useRouter();
    const { cart } = useAppSelector(usersSelector);
    return (
        <ChakraMenu>
            <MenuButton
                aria-label="Options"
                as={IconButton}
                color="white"
                icon={<HamburgerIcon />}
                variant="outline"
            />
            <MenuList>
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
                                >
                                    {link.url === '/dashboard/cart' &&
                                    cart.length > 0
                                        ? cart.length
                                        : ''}{' '}
                                    {link.text}
                                </Link>
                            </MenuItem>
                        );
                    }
                    return (
                        <MenuItem key={index}>
                            <Button
                                color="black"
                                key={index}
                                onClick={link.click}
                                sx={{ pl: '8px' }}
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

export default Menu;
