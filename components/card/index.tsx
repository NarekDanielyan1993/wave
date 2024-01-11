import type { AddToCartPayloadType, cardViewTypesUnion } from 'types';
import { type IProductResponse } from 'types/product';
import HomeCard from './home';
import ShopCard from './shop';

const Card = ({
    card,
    type,
    addToCartHandler,
}: {
    card: IProductResponse;
    type: cardViewTypesUnion;
    addToCartHandler: (data: AddToCartPayloadType) => void;
}) => {
    switch (type) {
        case 'home': {
            return (
                <HomeCard addToCartHandler={addToCartHandler} product={card} />
            );
        }
        case 'shop': {
            return (
                <ShopCard addToCartHandler={addToCartHandler} product={card} />
            );
        }
    }
};

export default Card;
