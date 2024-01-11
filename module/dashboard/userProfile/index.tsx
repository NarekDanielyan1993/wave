import { Divider } from '@chakra-ui/react';
import { StyledAccountContentWrapper } from '../account/style';
import EmailForm from './emailForm';
import ProfileForm from './profileForm';

const UserProfile = () => (
    <StyledAccountContentWrapper>
        <ProfileForm />
        <Divider
            orientation="horizontal"
            sx={{
                my: '4',
                borderWidth: '1',
                borderColor: 'brand.primary.darken',
            }}
        />
        <EmailForm />
    </StyledAccountContentWrapper>
);

export default UserProfile;
