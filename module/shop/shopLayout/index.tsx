import MobileMenu from '@components/layout/mobileMenu';
import { ShopLayoutType } from 'types';
import ShopSideBar from '../shopSideBar';
import {
    StyledDashboardLeftSide,
    StyledRightSide,
    StyledShopContainer,
} from './style';

const ShopLayout = ({ children, filterProducts }: ShopLayoutType) => (
    <StyledShopContainer>
        <MobileMenu hideFrom="lg">
            <ShopSideBar filterProducts={filterProducts} />
        </MobileMenu>
        <StyledDashboardLeftSide hideBelow="lg">
            <ShopSideBar filterProducts={filterProducts} />
        </StyledDashboardLeftSide>
        <StyledRightSide>{children}</StyledRightSide>
    </StyledShopContainer>
);

export default ShopLayout;
