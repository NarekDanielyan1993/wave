import type { AddToCartPayloadType, CardViewTypeUnion } from 'types';
import type { IProductResponse } from 'types/product';
import Card from '..';
import { StyledCardList } from './style';

const CardList = ({
    cards = [],
    type,
    addToCartHandler,
}: {
    type: CardViewTypeUnion;
    cards: IProductResponse[];
    addToCartHandler: (data: AddToCartPayloadType) => void;
}) => (
    <StyledCardList>
        {cards.map((card: IProductResponse, index: number) => (
            <Card
                addToCartHandler={addToCartHandler}
                card={card}
                key={index}
                type={type}
            />
        ))}
    </StyledCardList>
);

export default CardList;
