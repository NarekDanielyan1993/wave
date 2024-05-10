import { Button } from '@chakra-ui/react';
import useForm from '@hooks/useForm';
import {
    UserProfileValidationTypes,
    userProfileValidationSchema,
} from 'common/validation/user';
import { FormProvider } from 'react-hook-form';
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

    const methods = useForm<UserProfileValidationTypes>({
        validationSchema: userProfileValidationSchema,
        defaultValues,
    });

    const { TextField, formState, handleSubmit } = methods;

    const formSubmitHandler = (data: UserProfileValidationTypes) => {
        updateUserProfile(data);
    };

    return (
        <FormProvider {...methods}>
            <form onSubmit={handleSubmit(formSubmitHandler)}>
                <TextField label="First Name" name="firstName" />
                <TextField label="Last Name" name="lastName" />
                <Button
                    isDisabled={!(formState.isValid && formState.isDirty)}
                    isLoading={isLoading}
                    type="submit"
                    variant="primary"
                >
                    Edit Profile
                </Button>
            </form>
        </FormProvider>
    );
};

export default ProfileForm;
