import { Button } from '@chakra-ui/react';
import useForm from '@hooks/useForm';
import {
    UserProfileEmailValidationTypes,
    userProfileEmailValidationSchema,
} from 'common/validation/user';
import { useSession } from 'next-auth/react';
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
    console.log(user);

    const { handleSubmit, FormField, formState } =
        useForm<UserProfileEmailValidationTypes>({
            validationSchema: userProfileEmailValidationSchema,
            defaultValues,
            isDisabled: true,
        });

    const formSubmitHandler = (data: UserProfileEmailValidationTypes) => {
        updateUserEmail(data);
    };

    return (
        <form onSubmit={handleSubmit(formSubmitHandler)}>
            {FormField({
                name: 'email',
                label: 'Email',
                disabled: user?.isProvider,
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
