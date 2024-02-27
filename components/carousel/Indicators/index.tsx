import React from 'react';
import { StyledIndicatorContainer, StyledIndicatorWrapper } from './style';

const Indicators = ({ children }: { children: React.ReactNode }) => (
    <StyledIndicatorContainer>
        <StyledIndicatorWrapper>{children}</StyledIndicatorWrapper>
    </StyledIndicatorContainer>
);

export default Indicators;
