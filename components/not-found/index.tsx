import {
    StyledNotFounWrapper,
    StyledNotFound,
    StyledNotFoundIcon,
    StyledNotFoundText,
} from './style';

const NotFound = ({ text, withIcon = true }) => (
    <StyledNotFound>
        <StyledNotFounWrapper>
            {withIcon && <StyledNotFoundIcon />}
            <StyledNotFoundText>{text || 'Not Found'}</StyledNotFoundText>
        </StyledNotFounWrapper>
    </StyledNotFound>
);

export default NotFound;
