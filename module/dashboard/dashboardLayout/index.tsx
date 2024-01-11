import Sidebar from '@components/sideBar';
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
}: DashboardLayoutTypes) => (
    <StyledDashboardWrapper>
        <StyledDashboardLeftSide>
            <Sidebar />
        </StyledDashboardLeftSide>
        <StyledRightSide>
            <StyledDashboardHeader as="h3">
                {rightSideTitle}
            </StyledDashboardHeader>
            {children}
        </StyledRightSide>
    </StyledDashboardWrapper>
);

export default DashboardLayout;
