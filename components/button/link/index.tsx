import { Link as ChakraLink } from '@chakra-ui/react';
import NextLink from 'next/link';
import { ILink } from 'types';
const Link = ({ href, children, ...props }: ILink) => (
    <NextLink href={href} passHref>
        <ChakraLink {...props}>{children}</ChakraLink>
    </NextLink>
);

export default Link;
