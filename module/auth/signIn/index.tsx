import { Button } from '@chakra-ui/react';
import {
    AuthSignInTypes,
    authSignInValidationSchema,
} from '@common/validation/auth';
import { AUTH_ROUTES } from '@constant/route';
import useForm from '@hooks/useForm';
import SocialSignInButtons from '@module/auth/socialSignInButtons';
import {
    StyledAuthContainer,
    StyledAuthTitle,
    StyledAuthWrapper,
} from '@module/auth/style';
import SwitchSignUpSignIn from '@module/auth/switchTo';
import { FormProvider } from 'react-hook-form';

const SignInModule = ({
    onSubmit,
    isLoading,
}: {
    onSubmit: (data: AuthSignInTypes) => void;
    isLoading: boolean;
}) => {
    const authDefaultData: AuthSignInTypes = {
        email: '',
        password: '',
    };

    const methods = useForm<AuthSignInTypes>({
        validationSchema: authSignInValidationSchema,
        defaultValues: authDefaultData,
    });

    const { PasswordField, TextField, handleSubmit } = methods;

    return (
        <FormProvider {...methods}>
            <StyledAuthContainer>
                <StyledAuthWrapper onSubmit={handleSubmit(onSubmit)}>
                    <StyledAuthTitle as="h3">sign in</StyledAuthTitle>
                    <TextField
                        disabled={isLoading}
                        label="Email"
                        name="email"
                    />
                    <PasswordField
                        disabled={isLoading}
                        label="Password"
                        name="password"
                    />
                    <Button
                        data-testId="sign-in-button"
                        isLoading={isLoading}
                        type="submit"
                        variant="primary"
                        width="full"
                    >
                        Sign In
                    </Button>
                    <SwitchSignUpSignIn
                        redirectLink={AUTH_ROUTES.SIGN_UP}
                        redirectToText="Sign Up"
                        text="Not registered yet?"
                    />
                    <SocialSignInButtons />
                </StyledAuthWrapper>
            </StyledAuthContainer>
        </FormProvider>
    );
};

export default SignInModule;
