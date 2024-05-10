import { Button } from '@chakra-ui/react';
import useForm from '@hooks/useForm';
import {
    UserProfileEmailValidationTypes,
    userProfileEmailValidationSchema,
} from 'common/validation/user';
import { useSession } from 'next-auth/react';
import { FormProvider } from 'react-hook-form';
import { IUser } from 'types';

const EmailForm = ({
    isEmailLoading,
    userData,
    updateUserEmail,
}: {
    updateUserEmail: (data: UserProfileEmailValidationTypes) => void;
    userData: IUser;
    isEmailLoading: boolean;
}) => {
    const {
        data: { user },
    } = useSession();
    const defaultValues: UserProfileEmailValidationTypes = {
        email: userData?.email || '',
    };

    const methods = useForm<UserProfileEmailValidationTypes>({
        validationSchema: userProfileEmailValidationSchema,
        defaultValues,
        isDisabled: true,
    });

    const { TextField, formState, handleSubmit } = methods;

    const formSubmitHandler = (data: UserProfileEmailValidationTypes) => {
        updateUserEmail(data);
    };

    return (
        <FormProvider {...methods}>
            <form onSubmit={handleSubmit(formSubmitHandler)}>
                <TextField
                    disabled={user?.isProvider}
                    label="Email"
                    name="email"
                />
                <Button
                    isDisabled={!(formState.isValid && formState.isDirty)}
                    isLoading={isEmailLoading}
                    type="submit"
                    variant="primary"
                >
                    Edit email
                </Button>
            </form>
        </FormProvider>
    );
};

export default EmailForm;
