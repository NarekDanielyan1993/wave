import type {
    DeleteProductActionTypes,
    DeleteProductPayloadTypes,
    GetBrandsActionTypes,
    GetPaginatedProductsActionPayload,
    GetPaginatedProductsActionTypes,
    GetProductActionPayload,
    GetProductActionTypes,
    GetProductsActionTypes,
    GetProductsSortByCreatedDateActionTypes,
    GetProductsSortBySoldActionTypes,
    addProductActionTypes,
    addProductPayloadTypes,
    editProductActionTypes,
    editProductPayloadTypes,
} from 'types';
import type { IProductsQueryParams } from 'types/product';

export const GET_PRODUCTS = 'GET_PRODUCTS';
export const GET_PAGINATED_PRODUCTS = 'GET_PAGINATED_PRODUCTS';
export const GET_PRODUCTS_BY_SOLD = 'GET_PRODUCTS_BY_SOLD';
export const GET_PRODUCTS_CREATED_DATE = 'GET_PRODUCTS_CREATED_DATE';
export const DELETE_PRODUCT = 'DELETE_PRODUCT';
export const EDIT_PRODUCT = 'EDIT_PRODUCT';
export const ADD_PRODUCT = 'ADD_PRODUCT';
export const GET_PRODUCT = 'GET_PRODUCT';
export const GET_BRANDS = 'GET_BRANDS';

export const ProductsReducerName = 'products';

export function getBrands(): GetBrandsActionTypes {
    return {
        type: GET_BRANDS,
    };
}

export function getProducts(
    data: GetPaginatedProductsActionPayload
): GetProductsActionTypes {
    return {
        type: GET_PRODUCTS,
        payload: data,
    };
}

export function getProduct(
    data: GetProductActionPayload
): GetProductActionTypes {
    return {
        type: GET_PRODUCT,
        payload: data,
    };
}

export function getPaginatedProducts(
    data: GetPaginatedProductsActionPayload
): GetPaginatedProductsActionTypes {
    return {
        type: GET_PAGINATED_PRODUCTS,
        payload: data,
    };
}

export function editProduct(
    data: editProductPayloadTypes
): editProductActionTypes {
    return {
        type: EDIT_PRODUCT,
        payload: data,
    };
}

export function addProduct(
    paginationData: GetPaginatedProductsActionPayload,
    data: addProductPayloadTypes
): addProductActionTypes {
    return {
        type: ADD_PRODUCT,
        payload: { paginationData, data },
    };
}

export function deleteProduct(
    data: DeleteProductPayloadTypes
): DeleteProductActionTypes {
    return {
        type: DELETE_PRODUCT,
        payload: data,
    };
}

export function getProductsBySold(
    data: IProductsQueryParams<number>
): GetProductsSortBySoldActionTypes {
    return {
        type: GET_PRODUCTS_BY_SOLD,
        payload: data,
    };
}

export function getProductsByCreatedDate({
    limit,
    order,
    sortBy,
}: IProductsQueryParams<number>): GetProductsSortByCreatedDateActionTypes {
    return {
        type: GET_PRODUCTS_CREATED_DATE,
        payload: {
            limit,
            order,
            sortBy,
        },
    };
}
