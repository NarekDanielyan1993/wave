import { Box, Button, Flex, Text } from '@chakra-ui/react';
import IconButton from '@components/button/icon-button';
import ShoppingCartIcon from '@components/icons/shoppingCart';
import { withCurrency } from '@utils/helper';
import { IProductResponse } from 'types/product';

const ProductSection = ({
    product,
    addToCartHandler,
    isCartLoading,
}: {
    isCartLoading: boolean;
    product: IProductResponse;
    addToCartHandler: (productId: string) => void;
}) => (
    <Box flexGrow={1}>
        <Text fontSize="2xl" fontWeight="bold">
            {product.model}
        </Text>
        <Text my={2}>{product.description}</Text>
        <Flex flexDir="column" gap={4} py={4} textTransform="uppercase">
            <Flex alignItems="center" gap={2}>
                <IconButton boxSize={8} fontSize="2rem" iconName="check" />
                <Text color="brand.primary.main">
                    free shipping for
                    <br />
                    us location
                </Text>
            </Flex>
            <Flex alignItems="center" gap={2} textTransform="uppercase">
                <IconButton boxSize={8} fontSize="2rem" iconName="truck" />
                <Text color="brand.primary.main">
                    {product.available} product/s in
                    <br /> wharehouse
                    <br /> available
                </Text>
            </Flex>
        </Flex>
        <Box borderY="1px solid lightgray" py={4}>
            <Text fontSize="xl">{withCurrency(product.price)}</Text>
            <Button
                isDisabled={isCartLoading}
                leftIcon={<ShoppingCartIcon />}
                onClick={() => addToCartHandler(product.id)}
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

export default ProductSection;
