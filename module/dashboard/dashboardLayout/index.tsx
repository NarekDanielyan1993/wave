import { useMediaQuery } from '@chakra-ui/react';
import MobileMenu from '@components/layout/mobileMenu';
import { LayoutTypes } from 'types';
import {
    StyledDashboardContainer,
    StyledDashboardLeftSide,
    StyledDashboardWrapper,
    StyledRightSide,
} from './style';

const DashboardLayout = ({ children, sideBar }: LayoutTypes) => {
    const [isMobile] = useMediaQuery('(max-width: 975px)');
    return (
        <StyledDashboardContainer>
            <StyledDashboardWrapper>
                {isMobile ? (
                    <>
                        <MobileMenu>{sideBar}</MobileMenu>
                    </>
                ) : (
                    <StyledDashboardLeftSide>{sideBar}</StyledDashboardLeftSide>
                )}
                <StyledRightSide>{children}</StyledRightSide>
            </StyledDashboardWrapper>
        </StyledDashboardContainer>
    );
};

export default DashboardLayout;
