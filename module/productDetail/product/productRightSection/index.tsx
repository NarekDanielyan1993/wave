import { Box, Button, Flex, Icon, Text } from '@chakra-ui/react';
import { AiOutlineCheck } from 'react-icons/ai';
import { BsCart4 } from 'react-icons/bs';
import { ImTruck } from 'react-icons/im';
import { IProductResponse } from 'types/product';

const ProductRightSection = ({
    product,
    addToCartHandler,
}: {
    product: IProductResponse;
    addToCartHandler: (productId: string) => void;
}) => (
    <Box flexGrow={1}>
        <Text fontSize="2xl" fontWeight="bold">
            {product.model}
        </Text>
        <Text my={2}>{product.description}</Text>
        <Box textTransform="uppercase" py={4}>
            <Flex alignItems="center" gap={2}>
                <Icon as={ImTruck} boxSize={8} color="brand.primary.main" />
                <Text color="brand.primary.main">
                    free shipping for
                    <br />
                    us location
                </Text>
            </Flex>
            <Flex alignItems="center" gap={2} textTransform="uppercase">
                <Icon
                    as={AiOutlineCheck}
                    boxSize={8}
                    color="brand.primary.main"
                />
                <Text color="brand.primary.main">
                    {product.available} product/s in
                    <br /> wharehouse
                    <br /> available
                </Text>
            </Flex>
        </Box>
        <Box borderY="1px solid lightgray" py={4}>
            <Text fontSize="xl">${product.price}</Text>
            <Button
                onClick={() => addToCartHandler(product.id)}
                leftIcon={<BsCart4 />}
                variant="secondary"
            >
                add to cart
            </Button>
        </Box>
        <Box borderY={4}>
            <Text fontSize="2xl" fontWeight="bold">
                SPECS:
            </Text>
            <Text>FRETS: {product.frets?.frets}</Text>
            <Text>WOOD: {product.woodType || '-'}</Text>
        </Box>
    </Box>
);

export default ProductRightSection;
