import { useDisclosure, useMediaQuery } from '@chakra-ui/react';
import IconButton from '@components/button/icon-button';
import Drawer from '@components/sideBar/drawer';
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
}) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [isLargerThan800] = useMediaQuery('(max-width: 700px)');
    const [isLargerThan700] = useMediaQuery('(min-width: 700px)');
    return (
        <StyledShopWrapper>
            <StyledShopLeftSide>
                {isLargerThan700 && (
                    <ShopSideBar filterProducts={filterProducts} />
                )}
                {isLargerThan800 && (
                    <>
                        <IconButton
                            color="gray"
                            iconName="burger"
                            onClick={onOpen}
                        />
                        <Drawer
                            filterProducts={filterProducts}
                            isOpen={isOpen}
                            onClose={onClose}
                        />
                    </>
                )}
            </StyledShopLeftSide>
            <StyledShopRightSide>
                <Products />
            </StyledShopRightSide>
        </StyledShopWrapper>
    );
};

export default Shop;
