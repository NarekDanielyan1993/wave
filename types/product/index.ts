import type {
    AddToCartPayloadType,
    ProductCardSectionUnion,
} from 'types/client';
import type {
    IItemsQueryParams,
    IPaginatedDataResponse,
    IPaginatedItemsQueryParams,
    IParsedPaginatedITemsQueryParams,
    UppercaseKeys,
} from 'types/common';
import type { Keys } from 'types/database';

export type ProductGetQueryParamsTypes = {
    productId: string;
};

export interface IProduct {
    model: string;
    brandId: string;
    frets: number;
    woodType: string;
    description: string;
    price: number;
    available: number;
    itemsSold?: number;
    shipping: boolean;
    images?: string[];
    url: string;
}

export interface IProductBody extends Omit<IProduct, 'url'> {
    file: string;
}

export interface IProductResponse extends IProduct {
    id: string;
    brand: {
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
    };
    createdAt: Date | string;
    updatedAt: Date | string;
}

export interface IProductCard {
    product: IProductResponse;
    addToCartHandler: (data: AddToCartPayloadType) => void;
}

export interface IProductTable
    extends Exclude<IProduct, 'images'>,
        Pick<IProductResponse, 'createdAt' | 'updatedAt' | 'id'> {}

export interface IProductCardsLoading {
    key: ProductCardSectionUnion;
    isLoading: boolean;
}

// export type IProductCard = {
//     img: string;
//     title: string;
//     textPrimary: string;
//     price: number;
//     desc: string;
// };

export type IProductCardStoreState = {
    isLoading: boolean;
    isFetched: boolean;
    data: IProductCard[];
};

export type IProductOptional = Partial<IProduct>;

export type IProductModelSortByFields = UppercaseKeys<Keys<'Product'>>;
export type IProductModelSortByFieldsUnion = Keys<'Product'>;

export type IProductModelFields = Keys<'Product'>;

export type IParsedProductsQueryParams<K> = IItemsQueryParams<
    IProductModelFields,
    K
>;

// export type IPaginatedProducts<K> = IItemsQueryParams<IProductModelFields, K>;

export type IProductsQueryParams<K> = IItemsQueryParams<IProductModelFields, K>;

export type IPaginatedProductsQueryParams<K> = IPaginatedItemsQueryParams<
    IProductModelFields,
    K
>;

export type IParsedPaginatedProductsQueryParams<K> =
    IParsedPaginatedITemsQueryParams<IProductModelFields, K>;

// export interface IPaginatedProductResponse {
//     limit: number;
//     totalItems: number;
//     page: number;
//     products: IProductResponse[];
// }

export type IPaginatedProductResponse = IPaginatedDataResponse<
    IProductModelFields,
    number
> & { products: IProductResponse[] };

export interface IPaginatedProductResponseClient {
    pageCount: number;
    products: IProductResponse[];
}

export interface IProductService {
    createProduct(product: IProduct): Promise<IProductResponse>;
    getProductById(id: string): Promise<IProductResponse | null>;
    updateProduct(
        id: string,
        product: IProductOptional
    ): Promise<IProductResponse>;
    deleteProduct(id: string): Promise<IProductResponse>;
    getProducts({
        sortBy,
        limit,
        order,
    }: IProductsQueryParams<number>): Promise<IProductResponse[] | null>;

    getPaginatedProducts({
        sortBy,
        page,
        limit,
        order,
    }: IParsedPaginatedProductsQueryParams<number>): Promise<IPaginatedProductResponse | null>;
}