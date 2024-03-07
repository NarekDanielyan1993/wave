import Link from '@components/button/link';
import { AUTH_ROUTES } from '@constant/route';
import Image from 'next/image';
import {
    StyledSignUpCompletionContainer,
    StyledSignUpCompletionHeader,
    StyledSignUpCompletionText,
    StyledSignUpCompletionWrapper,
} from './style';

const CompletionSignUp = () => (
    <StyledSignUpCompletionContainer>
        <StyledSignUpCompletionWrapper>
            <Image
                alt="signUp"
                height={260}
                src="/images/signUpCompletion.svg"
                width={260}
            />
            <StyledSignUpCompletionHeader>
                thank you
            </StyledSignUpCompletionHeader>
            <StyledSignUpCompletionText as="span">
                Thank you for signing up with Wave. We appreciate your support!
                To get started, you can click on the link below to go to the Log
                in page.
            </StyledSignUpCompletionText>
            <Link href={AUTH_ROUTES.BASE} variant="tertiary">
                Log In
            </Link>
        </StyledSignUpCompletionWrapper>
    </StyledSignUpCompletionContainer>
);

export default CompletionSignUp;
