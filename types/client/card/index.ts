import { IProductResponse } from 'types/product';
import { AddToCartPayloadType } from '../store';

export type CardItemTypes = {
    img: string;
    title: string;
    textPrimary: string;
    textSecondary: string;
    desc: string;
};

export type CardViewTypeUnion = 'home' | 'shop';

export type CardListTypes = {
    cards: CardItemTypes[];
};

export interface IProductCard {
    product: IProductResponse;
    addToCartHandler: (data: AddToCartPayloadType) => void;
}
