import {
    ADD_PRODUCT,
    DELETE_IMAGE,
    DELETE_PRODUCT,
    EDIT_PRODUCT,
    GET_BRANDS,
    GET_PAGINATED_PRODUCTS,
    GET_PRODUCT,
    GET_PRODUCTS,
    GET_PRODUCTS_BY_SOLD,
    GET_PRODUCTS_CREATED_DATE,
} from '@store/products/action';
import type { Filters } from 'types/database';
import { type IProductResponse } from 'types/product';
import { AddToCartPayloadType } from '../user';

export type GET_PRODUCTS_TYPE = typeof GET_PRODUCTS;
export type GET_PRODUCT_TYPE = typeof GET_PRODUCT;
export type GET_PRODUCTS_BY_SOLD_TYPE = typeof GET_PRODUCTS_BY_SOLD;
export type GET_PRODUCTS_CREATED_DATE_TYPE = typeof GET_PRODUCTS_CREATED_DATE;
export type GET_PAGINATED_PRODUCTS_TYPE = typeof GET_PAGINATED_PRODUCTS;
export type DELETE_PRODUCT_TYPE = typeof DELETE_PRODUCT;
export type DELETE_IMAGE_TYPE = typeof DELETE_IMAGE;
export type EDIT_PRODUCT_TYPE = typeof EDIT_PRODUCT;
export type ADD_PRODUCT_TYPE = typeof ADD_PRODUCT;
export type GET_BRANDS_TYPE = typeof GET_BRANDS;

// ACTIONS

export type GetProductsActionPayload = {
    filters?: Filters;
    skip: number;
    limit: number;
};

export type GetPaginatedProductsActionPayload = {
    filters?: Filters;
    page?: number;
    order?: string;
    limit?: number;
};

export type GetProductsActionTypes = {
    type: GET_PRODUCTS_TYPE;
    payload: GetPaginatedProductsActionPayload;
};

export type GetProductActionPayload = {
    id: string;
};

export type GetProductActionTypes = {
    type: GET_PRODUCT_TYPE;
    payload: GetProductActionPayload;
};

export type GetProductsSortBySoldActionTypes = {
    type: GET_PRODUCTS_BY_SOLD_TYPE;
    payload: GetProductsActionPayload;
};

export type GetProductsSortByCreatedDateActionTypes = {
    type: GET_PRODUCTS_CREATED_DATE_TYPE;
    payload: GetProductsActionPayload;
};

export type GetPaginatedProductsActionTypes = {
    type: GET_PAGINATED_PRODUCTS_TYPE;
    payload: GetPaginatedProductsActionPayload;
};

export type DeleteProductActionTypes = {
    type: DELETE_PRODUCT_TYPE;
    payload: DeleteProductPayloadTypes;
};

export type DeleteProductPayloadTypes = {
    id: string;
};

export type DeleteImageActionTypes = {
    type: DELETE_IMAGE_TYPE;
    payload: DeleteImagePayloadTypes;
};

export type DeleteImagePayloadTypes = {
    id: string;
    productId: string;
    publicId: string;
};

export interface editProductPayloadTypes
    extends Partial<addProductPayloadTypes> {
    id: string;
}

export type editProductActionTypes = {
    type: EDIT_PRODUCT_TYPE;
    payload: editProductPayloadTypes;
};

export type addProductPayloadTypes = {
    model: string;
    available: number;
    fretId: string;
    woodType: string;
    description: string;
    price: number;
    brandId: string;
    shipping: boolean;
};

export interface IAddProductPayload {
    paginationData: GetPaginatedProductsActionPayload;
    data: addProductPayloadTypes;
}

export type addProductActionTypes = {
    type: ADD_PRODUCT_TYPE;
    payload: IAddProductPayload;
};

export type GetBrandsResponseTypes = {
    id: string;
    name: string;
    createdAt: string;
    updatedAt: string;
};

export type GetBrandsActionTypes = {
    type: GET_BRANDS_TYPE;
};

export type ProductCardSectionUnion = 'bestSellingProducts' | 'latestProducts';

export type ProductCards = {
    which: ProductCardSectionUnion;
    title: string;
    addToCartHandler: (data: AddToCartPayloadType) => void;
};

export type IProductSortBy = {
    data: IProductResponse[];
    key: ProductCardSectionUnion;
};
