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

export const ProductCardsSection = ({ which, title }: ProductCards) => {
    const { data: products, isLoading } = useAppSelector(
        takeProductCardsSectionSelector(which)
    );
    return isLoading ? (
        <Loader />
    ) : (
        <StyledProductCardsContainer>
            <StyledProductCardsTitle>{title}</StyledProductCardsTitle>
            <StyledProductCardsWrapper>
                <CardList cards={products} type="home" />
            </StyledProductCardsWrapper>
        </StyledProductCardsContainer>
    );
};

export default ProductCardsSection;
