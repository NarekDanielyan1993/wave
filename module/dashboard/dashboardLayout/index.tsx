import MobileMenu from '@components/layout/mobileMenu';
import { LayoutTypes } from 'types';
import {
    StyledDashboardContainer,
    StyledDashboardLeftSide,
    StyledDashboardWrapper,
    StyledRightSide,
} from './style';

const DashboardLayout = ({ children, sideBar }: LayoutTypes) => {
    return (
        <StyledDashboardContainer>
            <StyledDashboardWrapper>
                <MobileMenu>{sideBar}</MobileMenu>
                <StyledDashboardLeftSide display={{ base: 'none', md: 'flex' }}>
                    {sideBar}
                </StyledDashboardLeftSide>
                <StyledRightSide>{children}</StyledRightSide>
            </StyledDashboardWrapper>
        </StyledDashboardContainer>
    );
};

export default DashboardLayout;
