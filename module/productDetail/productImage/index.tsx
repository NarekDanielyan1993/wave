import { Box } from '@chakra-ui/react';
import ImageComponent from '@components/image';

const ProductImage = ({ url }: { url: string }) => (
    <Box height="30rem" maxWidth="full" pos="relative" width="140rem">
        <ImageComponent layout="fill" src={url} />
    </Box>
);

export default ProductImage;
