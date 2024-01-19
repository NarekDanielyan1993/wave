import { useDisclosure, useMediaQuery } from '@chakra-ui/react';
import IconButton from '@components/button/icon-button';
import Sidebar from '@components/sideBar';
import Drawer from '@components/sideBar/drawer';
import { type DashboardLayoutTypes } from 'types';
import {
    StyledDashboardHeader,
    StyledDashboardLeftSide,
    StyledDashboardWrapper,
    StyledRightSide,
} from './style';

const DashboardLayout = ({
    children,
    rightSideTitle,
}: DashboardLayoutTypes) => {
    const [isLargerThan800] = useMediaQuery('(max-width: 700px)');
    const [isLargerThan700] = useMediaQuery('(min-width: 700px)');
    const { isOpen, onOpen, onClose } = useDisclosure();
    return (
        <StyledDashboardWrapper>
            {isLargerThan700 && (
                <StyledDashboardLeftSide>
                    <Sidebar />
                </StyledDashboardLeftSide>
            )}
            {isLargerThan800 && (
                <>
                    <IconButton
                        color="gray"
                        iconName="burger"
                        onClick={onOpen}
                    />
                    <Drawer isOpen={isOpen} onClose={onClose}>
                        <Sidebar />
                    </Drawer>
                </>
            )}
            <StyledRightSide>
                <StyledDashboardHeader as="h3">
                    {rightSideTitle}
                </StyledDashboardHeader>
                {children}
            </StyledRightSide>
        </StyledDashboardWrapper>
    );
};

export default DashboardLayout;
