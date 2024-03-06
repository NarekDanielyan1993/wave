import React from 'react';
import { StyledDashboardHeader } from './style';

const PageTitle = ({ children }: { children: React.ReactNode }) => (
    <StyledDashboardHeader as="h3" textAlign={{ base: 'center', lg: 'left' }}>
        {children}
    </StyledDashboardHeader>
);

export default PageTitle;
