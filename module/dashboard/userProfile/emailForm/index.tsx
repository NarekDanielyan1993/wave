import { Button } from '@chakra-ui/react';
import useForm from '@hooks/useForm';
import { useAppDispatch, useAppSelector } from '@store/create-store';
import { updateUserEmail } from '@store/user/action';
import { usersSelector } from '@store/user/selectors';
import {
    UserProfileEmailValidationTypes,
    userProfileEmailValidationSchema,
} from 'common/validation/user';

// eslint-disable-next-line react/function-component-definition
function EmailForm() {
    const {
        user: { data: userData },
        isEmailLoading,
    } = useAppSelector(usersSelector);
    const dispatch = useAppDispatch();

    const defaultValues: UserProfileEmailValidationTypes = {
        email: userData?.email || '',
    };
    
    const { handleSubmit, FormField, formState } =
        useForm<UserProfileEmailValidationTypes>({
            validationSchema: userProfileEmailValidationSchema,
            defaultValues,
        });

    const formSubmitHandler = (data: UserProfileEmailValidationTypes) =>
        dispatch(updateUserEmail(data));

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
}

export default EmailForm;
