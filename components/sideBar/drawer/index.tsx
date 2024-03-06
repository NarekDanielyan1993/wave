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
}) => (
    <Box>
        <DrawerOverlay
            onClick={onClose}
            sx={{
                display: isOpen ? 'block' : 'none',
                backgroundColor: `rgba(0,0,0,0.5)`,
            }}
        />
        <StyledDrawer sx={{ transform: `translateX(${isOpen ? 0 : -100}%)` }}>
            <IconButton
                color="gray"
                iconName="close"
                marginLeft="auto"
                mr="1"
                onClick={onClose}
            />
            {children}
        </StyledDrawer>
    </Box>
);

export default Drawer;
