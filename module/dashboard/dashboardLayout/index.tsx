import MobileMenu from '@components/layout/mobileMenu';
import { LayoutTypes } from 'types';
import {
    StyledDashboardContainer,
    StyledDashboardLeftSide,
    StyledDashboardWrapper,
    StyledRightSide,
} from './style';

const DashboardLayout = ({ children, sideBar }: LayoutTypes) => (
    <StyledDashboardContainer>
        <StyledDashboardWrapper>
            <MobileMenu hideFrom="lg">{sideBar}</MobileMenu>
            <StyledDashboardLeftSide hideBelow="lg">
                {sideBar}
            </StyledDashboardLeftSide>
            <StyledRightSide>{children}</StyledRightSide>
        </StyledDashboardWrapper>
    </StyledDashboardContainer>
);

export default DashboardLayout;
