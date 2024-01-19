import {
    Drawer as ChakraDrawer,
    DrawerBody,
    DrawerCloseButton,
    DrawerContent,
    DrawerOverlay,
} from '@chakra-ui/react';

const Drawer = ({
    isOpen,
    onClose,
    children,
}: {
    children: React.ReactNode;
    isOpen: boolean;
    onClose: () => void;
}) => (
    <ChakraDrawer isOpen={isOpen} onClose={onClose} placement="left">
        <DrawerOverlay />
        <DrawerContent>
            <DrawerCloseButton />
            <DrawerBody>
                {children}
                {/* <ShopSideBar filterProducts={filterProducts} /> */}
            </DrawerBody>
        </DrawerContent>
    </ChakraDrawer>
);

export default Drawer;
