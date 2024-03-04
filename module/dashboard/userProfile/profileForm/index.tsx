import { Button } from '@chakra-ui/react';
import useForm from '@hooks/useForm';
import { useAppDispatch, useAppSelector } from '@store/create-store';
import { updateUserProfile } from '@store/user/action';
import { userSelector } from '@store/user/selectors';
import {
    UserProfileValidationTypes,
    userProfileValidationSchema,
} from 'common/validation/user';
import { SingleUserState } from 'types';

// eslint-disable-next-line react/function-component-definition
function ProfileForm() {
    const { data: userData, isLoading }: SingleUserState =
        useAppSelector(userSelector);

    const dispatch = useAppDispatch();

    const defaultValues: UserProfileValidationTypes = {
        firstname: userData?.firstname || '',
        lastname: userData?.lastname || '',
    };

    const { handleSubmit, FormField, formState } =
        useForm<UserProfileValidationTypes>({
            validationSchema: userProfileValidationSchema,
            defaultValues,
        });

    const formSubmitHandler = (data: UserProfileValidationTypes) =>
        dispatch(updateUserProfile(data));

    return (
        <form onSubmit={handleSubmit(formSubmitHandler)}>
            {FormField({
                name: 'firstname',
                label: 'First Name',
            })}
            {FormField({
                name: 'lastname',
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
}

export default ProfileForm;
