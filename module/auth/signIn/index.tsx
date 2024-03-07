import { Button } from '@chakra-ui/react';
import { AUTH_ROUTES } from '@constant/route';
import useForm from '@hooks/useForm';
import {
    AuthSignInTypes,
    authSignInValidationSchema,
    type AuthTypes,
} from 'common/validation/auth';
import SocialSignInButtons from '../socialSignInButtons';
import {
    StyledAuthContainer,
    StyledAuthTitle,
    StyledAuthWrapper,
} from '../style';
import SwitchSignUpSignIn from '../switchTo';

const SignInModule = ({
    onSubmit,
    isLoading,
}: {
    onSubmit: (data: AuthTypes) => void;
    isLoading: boolean;
}) => {
    const authDefaultData: AuthSignInTypes = {
        email: '',
        password: '',
    };

    const { handleSubmit, FormField } = useForm<AuthSignInTypes>({
        validationSchema: authSignInValidationSchema,
        defaultValues: authDefaultData,
    });
    return (
        <StyledAuthContainer>
            <StyledAuthWrapper onSubmit={handleSubmit(onSubmit)}>
                <StyledAuthTitle as="h3">sign in</StyledAuthTitle>
                {FormField({
                    disabled: isLoading,
                    name: 'email',
                    label: 'Email',
                })}
                {FormField({
                    disabled: isLoading,
                    name: 'password',
                    label: 'Password',
                    type: 'password',
                })}
                <Button
                    isLoading={isLoading}
                    type="submit"
                    variant="primary"
                    width="full"
                >
                    sign in
                </Button>
                <SwitchSignUpSignIn
                    redirectLink={AUTH_ROUTES.SIGN_UP}
                    redirectToText="Sign Up"
                    text="Not registered yet?"
                />
                <SocialSignInButtons />
            </StyledAuthWrapper>
        </StyledAuthContainer>
    );
};

export default SignInModule;
