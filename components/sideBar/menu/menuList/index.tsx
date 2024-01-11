import Link from '@components/button/link';
import { useRouter } from 'next/router';
import { SideBarMenuItem } from 'types';
import { StyledMenuItem } from '../style';

const MenuList = ({ list }: { list: SideBarMenuItem[] }) => {
    const { asPath } = useRouter();
    return list.map((menuItem: SideBarMenuItem, index: number) => (
        <StyledMenuItem key={index}>
            <Link
                aria-current={asPath === menuItem.href ? 'page' : undefined}
                href={menuItem.href}
                variant="secondary"
            >
                {menuItem.text}
            </Link>
        </StyledMenuItem>
    ));
};

export default MenuList;
