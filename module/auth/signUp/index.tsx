import { Button } from '@chakra-ui/react';
import { AUTH_ROUTES } from '@constant/route';
import useForm from '@hooks/useForm';
import {
    AuthSignUpTypes,
    authSignUpValidationSchema,
} from 'common/validation/auth';
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

    const { handleSubmit, FormField, reset } = useForm<AuthSignUpTypes>({
        validationSchema: authSignUpValidationSchema,
        defaultValues: authDefaultData,
    });

    const formSubmitHandler = (data: AuthSignUpTypes) => {
        onSubmit(data);
        reset();
    };

    return (
        <StyledAuthContainer>
            <StyledAuthWrapper onSubmit={handleSubmit(formSubmitHandler)}>
                <StyledAuthTitle as="h3">sign up</StyledAuthTitle>
                {FormField({
                    disabled: isLoading,
                    name: 'firstName',
                    label: 'First Name',
                })}
                {FormField({
                    disabled: isLoading,
                    name: 'lastName',
                    label: 'Last Name',
                })}
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
                    sign up
                </Button>
                <SwitchSignUpSignIn
                    redirectLink={AUTH_ROUTES.BASE}
                    redirectToText="Sign in"
                    text="Already sign up?"
                />
            </StyledAuthWrapper>
        </StyledAuthContainer>
    );
};

export default SignUpModule;
