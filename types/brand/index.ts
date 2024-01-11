import {
    IItemsQueryParams,
    IParsedPaginatedITemsQueryParams,
} from 'types/common';
import { Keys } from 'types/database';

export interface IBrand {
    name: string;
}

export type IPaginatedBrand<T> = IParsedPaginatedITemsQueryParams<
    IBrandModelFields,
    T
>;

export interface IBrandResponse extends IBrand {
    id: string;
}

export type IBrandModelFields = Keys<'Brand'>;

export type IBrandQueryParams<K> = IItemsQueryParams<IBrandModelFields, K>;

export interface IBrandService {
    createBrand: (brand: IBrand) => Promise<IBrandResponse>;
    updateBrand(id: string, brand: IBrand): Promise<IBrandResponse>;
    getBrand(id: string): Promise<IBrandResponse | null>;
    deleteBrandById(id: string): Promise<IBrandResponse | null>;
    getBrands(
        PaginatedData: IBrandQueryParams<number>
    ): Promise<IBrandResponse[] | null>;
}
