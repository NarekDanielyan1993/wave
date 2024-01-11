import { Box, Button, Icon, Text } from '@chakra-ui/react';
import { AiOutlineCheck } from 'react-icons/ai';
import { BsCart4 } from 'react-icons/bs';
import { ImTruck } from 'react-icons/im';
import type { IProductResponse } from 'types/product';

const ProductRightSection = ({ product }: { product: IProductResponse }) => (
    <Box flexGrow={1}>
        <Text fontSize="2xl" fontWeight="bold">
            {product.model}
        </Text>
        <Text my={2}>{product.description}</Text>
        <Box
            alignItems="center"
            display="flex"
            gap={2}
            mb={2}
            textTransform="uppercase"
        >
            <Icon as={ImTruck} boxSize={8} color="brand.primary.main" />
            <Box color="brand.primary.main">
                <Text>free shipping for</Text>
                <Text>us location</Text>
            </Box>
        </Box>
        <Box
            alignItems="center"
            display="flex"
            gap={2}
            textTransform="uppercase"
        >
            <Icon as={AiOutlineCheck} boxSize={8} color="brand.primary.main" />
            <Box color="brand.primary.main" mb={2}>
                <Text>
                    15 product/s in
                    <br /> wharehouse
                    <br /> available
                </Text>
            </Box>
        </Box>
        <Box borderY="1px solid lightgray" py={4}>
            <Text fontSize="xl">${product.price}</Text>
            <Button leftIcon={<BsCart4 />} variant="secondary">
                add to cart
            </Button>
        </Box>
        <Box borderY={4}>
            <Text fontSize="2xl" fontWeight="bold">
                SPECS:
            </Text>
            <Text>FRETS: {product.frets}</Text>
            <Text>WOOD: {product.woodType}</Text>
        </Box>
    </Box>
);

export default ProductRightSection;
