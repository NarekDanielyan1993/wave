import type {
    IItemsQueryParams,
    IPaginatedDataResponse,
    IPaginatedItemsQueryParams,
    IParsedPaginatedITemsQueryParams,
    UppercaseKeys,
} from 'types/common';
import type { Keys } from 'types/database';

export interface IFret {
    frets: number;
}

export type IFretBody = IFret;

export type FretsGetQueryParamsTypes = {
    fretId: string;
};

export interface IFretResponse extends IFret {
    id: string;
    createdAt: Date | string;
    updatedAt: Date | string;
}

// export interface IProductTable
//     extends Exclude<IProduct, 'images'>,
//         Pick<IProductResponse, 'createdAt' | 'updatedAt' | 'id'> {}

export type IFretModelSortByFields = UppercaseKeys<Keys<'Frets'>>;
export type IFretModelSortByFieldsUnion = Keys<'Frets'>;

export type IFretModelFields = Keys<'Frets'>;

export type IParsedFretsQueryParams<K> = IItemsQueryParams<IFretModelFields, K>;

export type IFretsQueryParams<K> = IItemsQueryParams<IFretModelFields, K>;

export type IPaginatedFretsQueryParams<K> = IPaginatedItemsQueryParams<
    IFretModelFields,
    K
>;

export type IParsedPaginatedFretsQueryParams<K> =
    IParsedPaginatedITemsQueryParams<IFretModelFields, K>;

export type IPaginatedFretsResponse = IPaginatedDataResponse<
    IFretModelFields,
    number
> & { frets: IFretResponse[] };

export interface IPaginatedFretsResponseClient {
    pageCount: number;
    products: IFretResponse[];
}

export interface IFretService {
    createFrets(fret: IFret): Promise<IFretResponse>;
    updateFrets(id: string, product: IFret): Promise<IFretResponse>;
    deleteFrets(id: string): Promise<IFretResponse>;
    getPaginatedFrets({
        sortBy,
        page,
        limit,
        order,
    }: IParsedPaginatedFretsQueryParams<number>): Promise<IPaginatedFretsResponse | null>;
}
