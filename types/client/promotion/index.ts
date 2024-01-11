export type PromotionTypes = {
    lineOneText: string;
    lineTwoText: string;
    linkText: string;
    linkTo: string;
};

export interface SlimPromotionTypes extends PromotionTypes {
    imageUrl: string;
}

export interface SliderPromotionTypes extends PromotionTypes {
    imageUrl: string;
}
