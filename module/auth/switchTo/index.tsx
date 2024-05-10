import Link from '@components/button/link';
import { StyledSwitchToSignUpSignIn, StyledSwitchToText } from './style';

const SwitchSignUpSignIn = ({
    text,
    redirectLink,
    redirectToText,
}: {
    redirectLink: string;
    text: string;
    redirectToText: string;
}) => (
    <StyledSwitchToSignUpSignIn>
        <StyledSwitchToText as="span">{text}&nbsp;</StyledSwitchToText>
        <Link href={redirectLink} textTransform="initial" variant="secondary">
            {redirectToText}
        </Link>
    </StyledSwitchToSignUpSignIn>
);

export default SwitchSignUpSignIn;
