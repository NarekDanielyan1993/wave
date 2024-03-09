import MobileMenu from '@components/layout/mobileMenu';
import Sidebar from '@components/sideBar';
import { DashboardLayoutType } from 'types';
import {
    StyledDashboardContainer,
    StyledDashboardLeftSide,
    StyledDashboardWrapper,
    StyledRightSide,
} from './style';

const DashboardLayout = ({ children }: DashboardLayoutType) => (
    <StyledDashboardContainer>
        <StyledDashboardWrapper>
            <MobileMenu hideFrom="lg">
                <Sidebar />
            </MobileMenu>
            <StyledDashboardLeftSide hideBelow="lg">
                <Sidebar />
            </StyledDashboardLeftSide>
            <StyledRightSide>{children}</StyledRightSide>
        </StyledDashboardWrapper>
    </StyledDashboardContainer>
);

export default DashboardLayout;
