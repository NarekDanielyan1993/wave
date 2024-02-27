import { useMediaQuery } from '@chakra-ui/react';
import React from 'react';
import { StyledDashboardHeader } from './style';

const PageTitle = ({ children }: { children: React.ReactNode }) => {
    const [isMobile] = useMediaQuery('(max-width: 975px)');
    return (
        <StyledDashboardHeader
            as="h3"
            sx={{ textAlign: isMobile ? 'center' : 'left' }}
        >
            {children}
        </StyledDashboardHeader>
    );
};

export default PageTitle;
