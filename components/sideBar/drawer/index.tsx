import { Box } from '@chakra-ui/react';
import IconButton from '@components/button/icon-button';
import DrawerOverlay from '../drawerOverlay';
import { StyledDrawer } from './style';

const Drawer = ({
    isOpen,
    onClose,
    children,
}: {
    children: React.ReactNode;
    isOpen: boolean;
    onClose: () => void;
}) => {
    return (
        <Box
            w={isOpen ? '40vw' : 0}
            pos={'fixed'}
            bottom={0}
            top={0}
            left={0}
            zIndex={1300}
            overflow={'hidden'}
            transition={'0.5s'}
        >
            {isOpen && <DrawerOverlay onClick={onClose} />}
            <StyledDrawer>
                <IconButton
                    mr={'1'}
                    marginLeft={'auto'}
                    color="gray"
                    iconName="close"
                    onClick={onClose}
                />
                {children}
            </StyledDrawer>
        </Box>
    );
};

export default Drawer;
