import { Button } from '@chakra-ui/react';
import useForm from '@hooks/useForm';
import {
    UserProfileValidationTypes,
    userProfileValidationSchema,
} from 'common/validation/user';
import { IUser } from 'types';

const ProfileForm = ({
    userData,
    isLoading,
    updateUserProfile,
}: {
    updateUserProfile: (data: UserProfileValidationTypes) => void;
    userData: IUser;
    isLoading: boolean;
}) => {
    const defaultValues: UserProfileValidationTypes = {
        firstName: userData?.firstName || '',
        lastName: userData?.lastName || '',
    };

    const { handleSubmit, FormField, formState } =
        useForm<UserProfileValidationTypes>({
            validationSchema: userProfileValidationSchema,
            defaultValues,
        });

    const formSubmitHandler = (data: UserProfileValidationTypes) => {
        updateUserProfile(data);
    };

    return (
        <form onSubmit={handleSubmit(formSubmitHandler)}>
            {FormField({
                name: 'firstName',
                label: 'First Name',
            })}
            {FormField({
                name: 'lastName',
                label: 'Last Name',
            })}
            <Button
                isDisabled={!(formState.isValid && formState.isDirty)}
                isLoading={isLoading}
                type="submit"
                variant="primary"
            >
                Edit Profile
            </Button>
        </form>
    );
};

export default ProfileForm;
