import { Divider } from '@chakra-ui/react';
import { useAppDispatch, useAppSelector } from '@store/create-store';
import { updateUserEmail, updateUserProfile } from '@store/user/action';
import { usersSelector } from '@store/user/selectors';
import {
    UserProfileEmailValidationTypes,
    UserProfileValidationTypes,
} from 'common/validation/user';
import { StyledAccountContentWrapper } from '../account/style';
import EmailForm from './emailForm';
import ProfileForm from './profileForm';
import ProfileImage from './profileImage';

const UserProfile = () => {
    const {
        user: { data: userData, isLoading },
        isEmailLoading,
    } = useAppSelector(usersSelector);
    const dispatch = useAppDispatch();

    const updateUserProfileHandler = (data: UserProfileValidationTypes) => {
        dispatch(updateUserProfile(data));
    };

    const updateUserEmailHandler = (data: UserProfileEmailValidationTypes) => {
        dispatch(updateUserEmail(data));
    };

    return (
        <StyledAccountContentWrapper>
            <ProfileImage />
            <ProfileForm
                isLoading={isLoading}
                updateUserProfile={updateUserProfileHandler}
                userData={userData}
            />
            <Divider
                orientation="horizontal"
                sx={{
                    my: '4',
                    borderWidth: '1',
                    borderColor: 'brand.primary.darken',
                }}
            />
            <EmailForm
                isEmailLoading={isEmailLoading}
                updateUserEmail={updateUserEmailHandler}
                userData={userData}
            />
        </StyledAccountContentWrapper>
    );
};

export default UserProfile;
