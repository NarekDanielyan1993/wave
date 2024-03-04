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
        <Box>
            <DrawerOverlay
                sx={{
                    transform: `translateX(${isOpen ? 0 : -100}%)`,
                    backgroundColor: isOpen
                        ? `rgba(0,0,0,0.5)`
                        : `rgba(0,0,0,0)`,
                }}
                onClick={onClose}
            />
            <StyledDrawer
                sx={{ transform: `translateX(${isOpen ? 0 : -100}%)` }}
            >
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
