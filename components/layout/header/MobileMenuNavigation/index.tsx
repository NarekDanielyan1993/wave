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

const MobileMenMenuNavigation = () => {
    const { links } = useGenerateNavLinks();
    const { asPath } = useRouter();
    const {
        cart: { quantity },
    } = useAppSelector(usersSelector);
    return (
        <ChakraMenu autoSelect={false}>
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
                                    variant={'secondary'}
                                    color="black"
                                    href={link.url}
                                    key={index}
                                    sx={{ width: '100%' }}
                                >
                                    {link.url === '/dashboard/cart' &&
                                    quantity > 0
                                        ? quantity
                                        : ''}{' '}
                                    {link.text}
                                </Link>
                            </MenuItem>
                        );
                    }
                    return (
                        <MenuItem as={'div'} key={index}>
                            <Button
                                variant={'ghost'}
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

export default MobileMenMenuNavigation;
