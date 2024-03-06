import { Text } from '@chakra-ui/react';
import React from 'react';

const CartItemText = ({
    children,
    text,
}: {
    text: string;
    children: React.ReactNode;
}) => (
    <>
        <Text fontWeight="bold">{text}</Text>
        <Text>{children}</Text>
    </>
);

export default CartItemText;
