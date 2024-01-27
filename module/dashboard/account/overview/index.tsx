import { useAppSelector } from '@store/create-store';
import { userSelector } from '@store/user/selectors';
import { StyledOverviewWrapper } from './style';

const Overview = () => {
    const user = useAppSelector(userSelector);
    return (
        <StyledOverviewWrapper>
            <p>{user.data.firstname}</p>
            <p>{user.data.lastname}</p>
            <p>{user.data.email}</p>
        </StyledOverviewWrapper>
    );
};

export default Overview;
