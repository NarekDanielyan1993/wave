import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { DateFns } from '@utils/date';
import type { GetBrandsResponseTypes, IPaginatedDataResponse } from 'types';
import { type IProductSortBy } from 'types/client/store/products';
import { IImageResponse } from 'types/image';
import {
    IProductResponseClient,
    type IPaginatedProductResponse,
    type IProductCardsLoading,
    type IProductCardStoreState,
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
    bestSellingProducts: IProductCardStoreState;
    latestProducts: IProductCardStoreState;
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
    bestSellingProducts: {
        isLoading: false,
        isFetched: false,
        data: [],
    },
    latestProducts: {
        isLoading: false,
        isFetched: false,
        data: [],
    },
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
            state.images = action.payload.images;
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
            console.log(action.payload);
            state.brands = action.payload;
        },
        getPaginatedProductsSuccess: (
            state: IProductsState,
            action: PayloadAction<IPaginatedProductResponse>
        ) => {
            const dateFns = new DateFns();
            state.products = action.payload.products.map(item => ({
                ...item,
                createdAt: dateFns.parseToHumanReadableFormat(
                    item.createdAt as string
                ),
                updatedAt: dateFns.parseToHumanReadableFormat(
                    item.updatedAt as string
                ),
            }));
            state.paginationData.limit = action.payload.limit;
            state.paginationData.page = action.payload.page;
            state.paginationData.totalItems = action.payload.totalItems;
            state.paginationData.filters = action.payload.filters;
            state.images = action.payload.images;
        },
        isProductCardsLoading: (
            state: IProductsState,
            action: PayloadAction<IProductCardsLoading>
        ) => {
            state[action.payload.key].isLoading = action.payload.isLoading;
        },
        isProductsLoading: (
            state: IProductsState,
            action: PayloadAction<boolean>
        ) => {
            state.isProductsLoading = action.payload;
        },
        getProductsSortBySuccess: (
            state: IProductsState,
            action: PayloadAction<IProductSortBy>
        ) => {
            state[action.payload.key].data = action.payload.data;
            state[action.payload.key].isFetched = true;
            state[action.payload.key].isLoading = true;
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
                        createdAt: dateFns.parseToHumanReadableFormat(
                            action.payload.product.createdAt as string
                        ),
                        updatedAt: dateFns.parseToHumanReadableFormat(
                            action.payload.product.updatedAt as string
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
                    createdAt: dateFns.parseToHumanReadableFormat(
                        action.payload.product.createdAt as string
                    ),
                    updatedAt: dateFns.parseToHumanReadableFormat(
                        action.payload.product.updatedAt as string
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
    isProductCardsLoading,
    isProductsLoading,
    addProductSuccess,
    editProductSuccess,
    deleteProductSuccess,
    deleteImageSuccess,
} = productsSlice.actions;
export default productsSlice.reducer;
