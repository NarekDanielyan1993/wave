import type { AppState } from '@store/create-store';
import type { ProductCardSectionUnion } from 'types/client/store/products';

export const takeProductCardsSectionSelector =
    (type: ProductCardSectionUnion) => (state: AppState) =>
        state.productState[type];
export const productsSelector = (state: AppState) => state.productState;
export const paginatedProductsSelector = (state: AppState) =>
    state.productState;
export const brandsSelector = (state: AppState) => state.productState;
