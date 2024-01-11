import BusinessDetails from './contacts';
import OngoingEventsInfo from './ongoingEventsInfo';
import {
    StyledContentWrapper,
    StyledFooterContainer,
    StyledFooterLeft,
    StyledFooterRight,
    StyledFooterTitle,
    StyledFooterWrapper,
} from './style';

const Footer = () => (
    <StyledFooterContainer>
        <StyledFooterWrapper>
            <StyledFooterTitle as="h3">Waves</StyledFooterTitle>
            <StyledContentWrapper>
                <StyledFooterLeft>
                    <BusinessDetails />
                </StyledFooterLeft>
                <StyledFooterRight>
                    <OngoingEventsInfo />
                </StyledFooterRight>
            </StyledContentWrapper>
        </StyledFooterWrapper>
    </StyledFooterContainer>
);

export default Footer;
