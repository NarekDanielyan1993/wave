import CardList from '@components/card/cardList';
import Loader from '@components/loader';
import { useAppSelector } from '@store/create-store';
import { takeProductCardsSectionSelector } from '@store/products/selectors';
import type { ProductCards } from 'types';
import {
    StyledProductCardsContainer,
    StyledProductCardsTitle,
    StyledProductCardsWrapper,
} from './style';

export const ProductCardsSection = ({
    which,
    title,
    addToCartHandler,
}: ProductCards) => {
    const { data: products, isLoading } = useAppSelector(
        takeProductCardsSectionSelector(which)
    );
    return isLoading ? (
        <Loader />
    ) : (
        <StyledProductCardsContainer>
            <StyledProductCardsTitle fontSize={{ base: 'xl', sm: '2xl' }}>
                {title}
            </StyledProductCardsTitle>
            <StyledProductCardsWrapper>
                <CardList
                    addToCartHandler={addToCartHandler}
                    cards={products}
                    type="home"
                />
            </StyledProductCardsWrapper>
        </StyledProductCardsContainer>
    );
};

export default ProductCardsSection;
