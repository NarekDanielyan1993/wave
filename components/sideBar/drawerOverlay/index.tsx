import { StyledDrawerOverlay } from './style';

const DrawerOverlay = ({ onClick }: { onClick: () => void }) => {
    return <StyledDrawerOverlay onClick={onClick} />;
};

export default DrawerOverlay;
