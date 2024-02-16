import { useDisclosure, useMediaQuery } from '@chakra-ui/react';
import IconButton from '@components/button/icon-button';
import Sidebar from '@components/sideBar';
import Drawer from '@components/sideBar/drawer';
import { useEffect, useState } from 'react';
import { type DashboardLayoutTypes } from 'types';
import {
    StyledDashboardContainer,
    StyledDashboardHeader,
    StyledDashboardLeftSide,
    StyledDashboardWrapper,
    StyledRightSide,
} from './style';

const DashboardLayout = ({
    children,
    rightSideTitle,
}: DashboardLayoutTypes) => {
    const [isMobile] = useMediaQuery('(max-width: 700px)');
    const [hideOnMobile, setHideOnMobile] = useState(false);
    useEffect(() => {
        setHideOnMobile(isMobile);
    }, [isMobile]);
    const { isOpen, onOpen, onClose } = useDisclosure();
    return (
        <StyledDashboardContainer>
            <StyledDashboardWrapper>
                {hideOnMobile ? (
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
                ) : (
                    <StyledDashboardLeftSide>
                        <Sidebar />
                    </StyledDashboardLeftSide>
                )}
                <StyledRightSide>
                    <StyledDashboardHeader as="h3">
                        {rightSideTitle}
                    </StyledDashboardHeader>
                    {children}
                </StyledRightSide>
            </StyledDashboardWrapper>
        </StyledDashboardContainer>
    );
};

export default DashboardLayout;
