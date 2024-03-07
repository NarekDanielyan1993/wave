import { Button } from '@chakra-ui/react';
import useForm from '@hooks/useForm';
import {
    UserProfileEmailValidationTypes,
    userProfileEmailValidationSchema,
} from 'common/validation/user';
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
    const defaultValues: UserProfileEmailValidationTypes = {
        email: userData?.email || '',
    };

    const { handleSubmit, FormField, formState } =
        useForm<UserProfileEmailValidationTypes>({
            validationSchema: userProfileEmailValidationSchema,
            defaultValues,
        });

    const formSubmitHandler = (data: UserProfileEmailValidationTypes) => {
        updateUserEmail(data);
    };

    return (
        <form onSubmit={handleSubmit(formSubmitHandler)}>
            {FormField({
                name: 'email',
                label: 'Email',
            })}
            <Button
                isDisabled={!(formState.isValid && formState.isDirty)}
                isLoading={isEmailLoading}
                type="submit"
                variant="primary"
            >
                Edit email
            </Button>
        </form>
    );
};

export default EmailForm;
