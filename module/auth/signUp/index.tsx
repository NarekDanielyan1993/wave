import { Button } from '@chakra-ui/react';
import { AUTH_ROUTES } from '@constant/route';
import useForm from '@hooks/useForm';
import { AuthTypes, authValidationSchema } from 'common/validation/auth';
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
    onSubmit: (data: AuthTypes) => void;
    isLoading: boolean;
}) => {
    const authDefaultData: AuthTypes = {
        email: '',
        password: '',
    };

    const { handleSubmit, FormField } = useForm<AuthTypes>({
        validationSchema: authValidationSchema,
        defaultValues: authDefaultData,
    });

    return (
        <StyledAuthContainer>
            <StyledAuthWrapper onSubmit={handleSubmit(onSubmit)}>
                <StyledAuthTitle as="h3">sign up</StyledAuthTitle>
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
                    redirectLink={AUTH_ROUTES.BASE}
                    redirectToText="Sign in"
                    text="Already sign up?"
                />
            </StyledAuthWrapper>
        </StyledAuthContainer>
    );
};

export default SignUpModule;
