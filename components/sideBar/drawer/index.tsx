import {
    Drawer as ChakraDrawer,
    DrawerBody,
    DrawerCloseButton,
    DrawerContent,
    DrawerOverlay,
} from '@chakra-ui/react';
import ShopSideBar from 'module/shop/shopSideBar';
import { GetPaginatedProductsActionPayload } from 'types';

const Drawer = ({
    isOpen,
    onClose,
    filterProducts,
}: {
    filterProducts: (data: GetPaginatedProductsActionPayload) => void;
    isOpen: boolean;
    onClose: () => void;
}) => (
    <ChakraDrawer isOpen={isOpen} onClose={onClose} placement="left">
        <DrawerOverlay />
        <DrawerContent>
            <DrawerCloseButton />
            <DrawerBody>
                <ShopSideBar filterProducts={filterProducts} />
            </DrawerBody>
        </DrawerContent>
    </ChakraDrawer>
);

export default Drawer;
