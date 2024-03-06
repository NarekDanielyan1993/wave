import { BRAND_API, PRODUCTS_API } from '@constant/api';
import type { PayloadAction } from '@reduxjs/toolkit';
import { showNotification } from '@store/notification/reducer';
import { apiRequest } from '@utils/apiRequest';
import type { AxiosResponse } from 'axios';
import { call, put, takeLatest } from 'redux-saga/effects';
import type {
    DeleteImagePayloadTypes,
    DeleteProductPayloadTypes,
    GetBrandsResponseTypes,
    GetPaginatedProductsActionPayload,
    GetProductActionPayload,
    IAddProductPayload,
    ProductCardSectionUnion,
    editProductPayloadTypes,
} from 'types';
import { IImageResponse } from 'types/image';
import type {
    IPaginatedProductResponse,
    IPaginatedProductResponseClient,
    IProductResponse,
    IProductResponseClient,
    IProductsQueryParams,
} from 'types/product';
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
    getPaginatedProducts,
} from './action';
import {
    deleteImageSuccess,
    deleteProductSuccess,
    editProductSuccess,
    getBrandsSuccess,
    getPaginatedProductsSuccess,
    getProductSuccess,
    getProductsSortBySuccess,
    getProductsSuccess,
    isProductsLoading,
} from './reducer';

function* getProductsGenerator(
    action: PayloadAction<GetPaginatedProductsActionPayload>
) {
    const { limit, order, page } = action.payload;
    try {
        yield put(isProductsLoading(true));
        const { data }: AxiosResponse<IPaginatedProductResponse> = yield call(
            apiRequest.get,
            PRODUCTS_API.GET_PAGINATED_PRODUCTS,
            {
                params: {
                    ...(limit && { limit }),
                    // ...(sortBy && { sortBy }),
                    ...(order && { order }),
                    ...(page && { page }),
                    ...(action.payload.filters && {
                        filters: JSON.stringify(action.payload.filters),
                    }),
                },
            }
        );
        yield put(getProductsSuccess(data));
    } catch (error) {
        console.log(error);
    }
    yield put(isProductsLoading(false));
}

function* getProductGenerator(action: PayloadAction<GetProductActionPayload>) {
    try {
        const { id } = action.payload;
        yield put(isProductsLoading(true));
        const { data }: AxiosResponse<IProductResponse> = yield call(
            apiRequest.get,
            `${PRODUCTS_API.GET_PRODUCT}/${id}`
        );
        yield put(getProductSuccess(data));
    } catch (error) {
        console.log(error);
    }
    yield put(isProductsLoading(false));
}

function* getBrandsGenerator() {
    try {
        yield put(isProductsLoading(true));
        const { data }: AxiosResponse<GetBrandsResponseTypes[]> = yield call(
            apiRequest.get,
            BRAND_API.GET_BRANDS
        );
        yield put(getBrandsSuccess(data));
    } catch (error: any) {
        yield put(
            showNotification({
                message: error?.response?.data?.msg,
                type: 'error',
            })
        );
    }
    yield put(isProductsLoading(false));
}

function* getPaginatedProductsGenerator(
    action: PayloadAction<GetPaginatedProductsActionPayload>
) {
    try {
        yield put(isProductsLoading(true));
        const { data }: AxiosResponse<IPaginatedProductResponseClient> =
            yield call(apiRequest.get, PRODUCTS_API.GET_PAGINATED_PRODUCTS, {
                params: {
                    ...action.payload,
                    ...(action.payload.filters && {
                        filters: JSON.stringify(action.payload.filters),
                    }),
                },
            });
        yield put(getPaginatedProductsSuccess(data));
    } catch (error: any) {
        yield put(
            showNotification({
                message: error?.response?.data?.msg,
                type: 'error',
            })
        );
    }
    yield put(isProductsLoading(false));
}

const getProductsSortBy = (key: ProductCardSectionUnion) =>
    function* (action: PayloadAction<IProductsQueryParams<number>>) {
        const { limit, sortBy, order } = action.payload;
        try {
            const { data }: AxiosResponse<IPaginatedProductResponseClient> =
                yield call(
                    apiRequest.get,
                    PRODUCTS_API.GET_PAGINATED_PRODUCTS,
                    {
                        params: {
                            ...(limit && { limit }),
                            ...(sortBy && { sortBy }),
                            ...(order && { order }),
                        },
                    }
                );
            yield put(getProductsSortBySuccess({ key, data }));
        } catch (error: any) {
            yield put(
                showNotification({
                    message: error?.response?.data?.msg,
                    type: 'error',
                })
            );
        }
    };

function* editProductGenerator(action: PayloadAction<editProductPayloadTypes>) {
    const { id, ...product } = action.payload;
    try {
        yield put(isProductsLoading(true));
        const { data }: AxiosResponse<IProductResponseClient> = yield call(
            apiRequest.put,
            `${PRODUCTS_API.EDIT_PRODUCT}/${id}`,
            product
        );
        yield put(editProductSuccess(data));
    } catch (error: any) {
        yield put(
            showNotification({
                message: error?.response?.data?.msg,
                type: 'error',
            })
        );
    }
    yield put(isProductsLoading(false));
}

function* addProductGenerator(action: PayloadAction<IAddProductPayload>) {
    try {
        yield put(isProductsLoading(true));
        const { data }: AxiosResponse<IProductResponse> = yield call(
            apiRequest.post,
            PRODUCTS_API.ADD_PRODUCT,
            {
                ...action.payload.data,
            }
        );
        yield put(
            getPaginatedProducts({
                limit: action.payload.paginationData.limit,
                page: action.payload.paginationData.page,
            })
        );
    } catch (error: any) {
        yield put(
            showNotification({
                message: error?.response?.data?.msg,
                type: 'error',
            })
        );
    }
    yield put(isProductsLoading(false));
}

function* deleteProductGenerator(
    action: PayloadAction<DeleteProductPayloadTypes>
) {
    const { id } = action.payload;

    try {
        yield put(isProductsLoading(true));
        const { data }: AxiosResponse<IProductResponse> = yield call(
            apiRequest.delete,
            `${PRODUCTS_API.DELETE_PRODUCT}/${id}`,
            {
                params: { productId: id },
            }
        );
        yield put(deleteProductSuccess(data));
        yield put(
            getPaginatedProducts({
                limit: 10,
                page: 0,
            })
        );
    } catch (error: any) {
        yield put(
            showNotification({
                message: error?.response?.data?.msg,
                type: 'error',
            })
        );
    }
    yield put(isProductsLoading(false));
}

function* deleteImageGenerator(action: PayloadAction<DeleteImagePayloadTypes>) {
    const { id, productId, publicId } = action.payload;

    try {
        yield put(isProductsLoading(true));
        const { data }: AxiosResponse<IImageResponse> = yield call(
            apiRequest.delete,
            PRODUCTS_API.DELETE_PRODUCT_IMAGE,
            {
                params: { productId, id, publicId },
            }
        );
        yield put(deleteImageSuccess(data));
    } catch (error: any) {
        yield put(
            showNotification({
                message: error?.response?.data?.msg,
                type: 'error',
            })
        );
    }
    yield put(isProductsLoading(false));
}

export function* watchProductsSaga() {
    yield takeLatest(GET_PRODUCTS, getProductsGenerator);
    yield takeLatest(
        GET_PRODUCTS_BY_SOLD,
        getProductsSortBy('bestSellingProducts')
    );
    yield takeLatest(
        GET_PRODUCTS_CREATED_DATE,
        getProductsSortBy('latestProducts')
    );
    yield takeLatest(GET_PAGINATED_PRODUCTS, getPaginatedProductsGenerator);
    yield takeLatest(DELETE_PRODUCT, deleteProductGenerator);
    yield takeLatest(DELETE_IMAGE, deleteImageGenerator);
    yield takeLatest(EDIT_PRODUCT, editProductGenerator);
    yield takeLatest(ADD_PRODUCT, addProductGenerator);
    yield takeLatest(GET_PRODUCT, getProductGenerator);
    yield takeLatest(GET_BRANDS, getBrandsGenerator);
}
