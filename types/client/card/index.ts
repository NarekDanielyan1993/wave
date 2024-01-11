export type CardItemTypes = {
    img: string;
    title: string;
    textPrimary: string;
    textSecondary: string;
    desc: string
};

export type cardViewTypesUnion = 'home' | 'shop';

export type CardListTypes = {
    cards: CardItemTypes[] 
};
