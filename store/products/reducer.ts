import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { DateFns } from '@utils/date';
import type {
    GetBrandsResponseTypes,
    IPaginatedDataResponse,
    ProductCardSectionUnion,
} from 'types';
import { IImageResponse } from 'types/image';
import {
    IPaginatedProductResponseClient,
    IProductResponseClient,
    type IPaginatedProductResponse,
    type IProductModelFields,
    type IProductResponse,
} from 'types/product';
import { ProductsReducerName } from './action';

interface IProductsState {
    isProductsLoading: boolean;
    products: IProductResponse[];
    images: IImageResponse[];
    product: IProductResponse;
    paginationData: IPaginatedDataResponse<IProductModelFields, number>;
    bestSellingProducts: IProductResponse[];
    latestProducts: IProductResponse[];
    brands: GetBrandsResponseTypes[];
}

const initialState: IProductsState = {
    products: [],
    images: [],
    product: {} as IProductResponse,
    paginationData: {
        limit: 10,
        page: 0,
        totalItems: 0,
        order: 'asc',
        sortBy: 'createdAt',
    },
    isProductsLoading: false,
    bestSellingProducts: [],
    latestProducts: [],
    brands: [],
};

const productsSlice = createSlice({
    name: ProductsReducerName,
    initialState,
    reducers: {
        getProductsSuccess: (
            state: IProductsState,
            action: PayloadAction<IPaginatedProductResponse>
        ) => {
            const dateFns = new DateFns();
            console.log(typeof action.payload.products[0]?.createdAt);
            state.products = [
                ...state.products,
                ...action.payload.products.map(item => ({
                    ...item,
                    createdAt: dateFns.parseToHumanReadableFormat(
                        item.createdAt as string
                    ),
                    updatedAt: dateFns.parseToHumanReadableFormat(
                        item.updatedAt as string
                    ),
                })),
            ];
            state.paginationData.limit = action.payload.limit;
            state.paginationData.page = action.payload.page;
            state.paginationData.totalItems = action.payload.totalItems;
            state.paginationData.filters = action.payload.filters;
            // state.images = action.payload.images;
        },
        getProductSuccess: (
            state: IProductsState,
            action: PayloadAction<IProductResponse>
        ) => {
            state.product = action.payload;
        },
        getBrandsSuccess: (
            state: IProductsState,
            action: PayloadAction<GetBrandsResponseTypes[]>
        ) => {
            state.brands = action.payload;
        },
        getPaginatedProductsSuccess: (
            state: IProductsState,
            action: PayloadAction<IPaginatedProductResponseClient>
        ) => {
            const dateFns = new DateFns();
            state.products = action.payload.products.map(item => ({
                ...item,
                createdAt: dateFns.formatDate(item.createdAt),
                updatedAt: dateFns.formatDate(item.updatedAt),
            }));
            state.paginationData.limit = action.payload.limit;
            state.paginationData.page = action.payload.page;
            state.paginationData.totalItems = action.payload.totalItems;
            state.paginationData.filters = action.payload.filters;
            state.images = action.payload.images;
        },
        isProductsLoading: (
            state: IProductsState,
            action: PayloadAction<boolean>
        ) => {
            state.isProductsLoading = action.payload;
        },
        getProductsSortBySuccess: (
            state: IProductsState,
            action: PayloadAction<{
                key: ProductCardSectionUnion;
                data: IPaginatedProductResponseClient;
            }>
        ) => {
            state[action.payload.key] = action.payload.data.products;
            state.images = action.payload.data.images;
        },
        editProductSuccess: (
            state: IProductsState,
            action: PayloadAction<IProductResponseClient>
        ) => {
            state.images = [...state.images, action.payload.image];
            const dateFns = new DateFns();
            state.products = state.products.map(product => {
                if (product.id === action.payload.product.id) {
                    return {
                        ...action.payload.product,
                        createdAt: dateFns.formatDate(
                            action.payload.product.createdAt
                        ),
                        updatedAt: dateFns.formatDate(
                            action.payload.product.updatedAt
                        ),
                    };
                }
                return product;
            });
        },
        addProductSuccess: (
            state: IProductsState,
            action: PayloadAction<IProductResponseClient>
        ) => {
            const dateFns = new DateFns();
            state.products = [
                ...state.products,
                {
                    ...action.payload.product,
                    createdAt: dateFns.formatDate(
                        action.payload.product.createdAt
                    ),
                    updatedAt: dateFns.formatDate(
                        action.payload.product.updatedAt
                    ),
                },
            ];
            state.paginationData.totalItems =
                state.paginationData.totalItems + 1;
            state.images = state.images.map(img => {
                if (img.id === action.payload.image.id) {
                    return img.id === action.payload.image.id
                        ? action.payload.image
                        : img;
                }
                return img;
            });
        },
        deleteProductSuccess: (
            state: IProductsState,
            action: PayloadAction<IProductResponse>
        ) => {
            state.products = state.products.filter(product =>
                product.id === action.payload.id ? action.payload : product
            );
            state.paginationData.totalItems =
                state.paginationData.totalItems - 1;
        },
        deleteImageSuccess: (
            state: IProductsState,
            action: PayloadAction<IImageResponse>
        ) => {
            state.images = state.images.filter(
                img => img.id !== action.payload.id
            );
        },
    },
});

export const {
    getProductsSuccess,
    getProductSuccess,
    getBrandsSuccess,
    getPaginatedProductsSuccess,
    getProductsSortBySuccess,
    isProductsLoading,
    addProductSuccess,
    editProductSuccess,
    deleteProductSuccess,
    deleteImageSuccess,
} = productsSlice.actions;
export default productsSlice.reducer;
