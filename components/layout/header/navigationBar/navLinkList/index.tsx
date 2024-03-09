import { Button } from '@chakra-ui/react';
import Link from '@components/button/link';
import { useRouter } from 'next/router';
import { NavLinkTypes } from 'types';
import { StyledLayoutNavLinkList } from '../style';

const NavLinkList = ({ list }: { list: NavLinkTypes[] }) => {
    const { asPath } = useRouter();
    return (
        <StyledLayoutNavLinkList>
            {list.map((link: NavLinkTypes, index: number) => {
                if (link.type === 'link') {
                    return (
                        <Link
                            aria-current={
                                asPath === link.url ? 'page' : undefined
                            }
                            href={link.url}
                            key={index}
                        >
                            {link.text}
                        </Link>
                    );
                }
                return (
                    <Button
                        key={index}
                        onClick={link.click}
                        pr={2}
                        variant="text"
                    >
                        {link.text}
                    </Button>
                );
            })}
        </StyledLayoutNavLinkList>
    );
};

export default NavLinkList;
