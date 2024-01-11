import type { Filters } from 'types/database';

export type stringOrNumberUnion<K> = K extends string ? string : number;

export type IItemsQueryParams<T, K> = {
    order?: string;
    sortBy?: T;
    limit: stringOrNumberUnion<K>;
};

export type IPaginatedDataResponse<T, K> = {
    totalItems: number;
    page: stringOrNumberUnion<K>;
    filters?: Filters;
} & IItemsQueryParams<T, K>;

export type IPaginatedItemsQueryParams<T, K> = {
    page: stringOrNumberUnion<K>;
    filters?: string;
} & IItemsQueryParams<T, K>;

export type IParsedPaginatedITemsQueryParams<T, K> = {
    page: number;
    filters?: Filters;
} & IItemsQueryParams<T, K>;

export type UppercaseKeys<T> = {
    [K in T as Uppercase<K & string>]: K;
};
