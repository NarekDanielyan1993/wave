import type { GetPaginatedProductsActionPayload } from 'types';
import Products from './products';
import ShopSideBar from './shopSideBar';
import {
    StyledShopLeftSide,
    StyledShopRightSide,
    StyledShopWrapper,
} from './style';

const Shop = ({
    filterProducts,
}: {
    filterProducts: (data: GetPaginatedProductsActionPayload) => void;
}) => (
    <StyledShopWrapper>
        <StyledShopLeftSide>
            <ShopSideBar filterProducts={filterProducts} />
        </StyledShopLeftSide>
        <StyledShopRightSide>
            <Products />
        </StyledShopRightSide>
    </StyledShopWrapper>
);

export default Shop;
