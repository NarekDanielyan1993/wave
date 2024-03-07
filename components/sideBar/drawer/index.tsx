import { Box } from '@chakra-ui/react';
import IconButton from '@components/button/icon-button';
import { useEffect } from 'react';
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
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
    }, [isOpen]);

    return (
        <Box left={0} pos="absolute" top={0}>
            <DrawerOverlay
                onClick={onClose}
                sx={{
                    opacity: isOpen ? 1 : 0,
                    transform: isOpen ? 'scale(1)' : 'scale(0)',
                }}
            />
            <StyledDrawer
                sx={{ transform: `translateX(${isOpen ? 0 : -100}%)` }}
            >
                <IconButton
                    color="gray"
                    fontSize="2rem"
                    iconName="close"
                    marginLeft="auto"
                    mr="1"
                    onClick={onClose}
                />
                {children}
            </StyledDrawer>
        </Box>
    );
};

export default Drawer;
