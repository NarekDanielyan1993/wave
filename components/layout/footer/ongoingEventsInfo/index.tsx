import {
    StyledFooterOngoingEventsInfoContent,
    StyledFooterOngoingEventsInfoTitle,
    StyledFooterOngoingEventsWrapper,
} from './style';

const OngoingEventsInfo = () => (
    <StyledFooterOngoingEventsWrapper>
        <StyledFooterOngoingEventsInfoTitle as="h5">
            Be the first to know
        </StyledFooterOngoingEventsInfoTitle>
        <StyledFooterOngoingEventsInfoContent as="p">
            get all the latet information on events, offers and sales. You can
            miss out.
        </StyledFooterOngoingEventsInfoContent>
    </StyledFooterOngoingEventsWrapper>
);

export default OngoingEventsInfo;
