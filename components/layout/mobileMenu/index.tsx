import { Box, useDisclosure } from '@chakra-ui/react';
import IconButton from '@components/button/icon-button';
import Drawer from '@components/sideBar/drawer';
import React from 'react';

const MobileMenu = ({ children }: { children: React.ReactNode }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    return (
        <Box>
            <IconButton color="gray" iconName="burger" onClick={onOpen} />
            <Drawer isOpen={isOpen} onClose={onClose}>
                {children}
            </Drawer>
        </Box>
    );
};

export default MobileMenu;
