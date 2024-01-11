import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { DateFns } from '@utils/date';
import type { GetBrandsResponseTypes, IPaginatedDataResponse } from 'types';
import { type IProductSortBy } from 'types/client/store/products';
import {
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
    product: IProductResponse;
    paginationData: IPaginatedDataResponse<IProductModelFields, number>;
    bestSellingProducts: IProductCardStoreState;
    latestProducts: IProductCardStoreState;
    brands: GetBrandsResponseTypes[];
}

const initialState: IProductsState = {
    products: [],
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
            action: PayloadAction<IProductResponse>
        ) => {
            const dateFns = new DateFns();
            state.products = state.products.map(product => {
                if (product.id === action.payload.id) {
                    return {
                        ...action.payload,
                        createdAt: dateFns.parseToHumanReadableFormat(
                            action.payload.createdAt as string
                        ),
                        updatedAt: dateFns.parseToHumanReadableFormat(
                            action.payload.updatedAt as string
                        ),
                    };
                }
                return product;
            });
        },
        addProductSuccess: (
            state: IProductsState,
            action: PayloadAction<IProductResponse>
        ) => {
            const dateFns = new DateFns();
            state.products = [
                ...state.products,
                {
                    ...action.payload,
                    createdAt: dateFns.parseToHumanReadableFormat(
                        action.payload.createdAt as string
                    ),
                    updatedAt: dateFns.parseToHumanReadableFormat(
                        action.payload.updatedAt as string
                    ),
                },
            ];
            state.paginationData.totalItems =
                state.paginationData.totalItems + 1;
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
} = productsSlice.actions;
export default productsSlice.reducer;
