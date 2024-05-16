import { Button } from '@chakra-ui/react';
import {
    AuthSignUpTypes,
    authSignUpValidationSchema,
} from '@common/validation/auth';
import { AUTH_ROUTES } from '@constant/route';
import useForm from '@hooks/useForm';
import SocialSignInButtons from '@module/auth/socialSignInButtons';
import { FormProvider } from 'react-hook-form';
import {
    StyledAuthContainer,
    StyledAuthTitle,
    StyledAuthWrapper,
} from '../style';
import SwitchSignUpSignIn from '../switchTo';

const SignUpModule = ({
    onSubmit,
    isLoading,
}: {
    onSubmit: (data: AuthSignUpTypes) => void;
    isLoading: boolean;
}) => {
    const authDefaultData: AuthSignUpTypes = {
        email: '',
        password: '',
        firstName: '',
        lastName: '',
    };

    const methods = useForm<AuthSignUpTypes>({
        validationSchema: authSignUpValidationSchema,
        defaultValues: authDefaultData,
    });

    const { PasswordField, TextField, reset, handleSubmit } = methods;

    const formSubmitHandler = (data: AuthSignUpTypes) => {
        onSubmit(data);
        reset();
    };

    return (
        <FormProvider {...methods}>
            <StyledAuthContainer>
                <StyledAuthWrapper onSubmit={handleSubmit(formSubmitHandler)}>
                    <StyledAuthTitle as="h3">sign up</StyledAuthTitle>
                    <TextField
                        disabled={isLoading}
                        label="First Name"
                        name="firstName"
                    />
                    <TextField
                        disabled={isLoading}
                        label="Last Name"
                        name="lastName"
                    />
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
                        isLoading={isLoading}
                        type="submit"
                        variant="primary"
                        width="full"
                    >
                        sign up
                    </Button>
                    <SwitchSignUpSignIn
                        redirectLink={AUTH_ROUTES.BASE}
                        redirectToText="Sign in"
                        text="Already sign up?"
                    />
                    <SocialSignInButtons />
                </StyledAuthWrapper>
            </StyledAuthContainer>
        </FormProvider>
    );
};

export default SignUpModule;
