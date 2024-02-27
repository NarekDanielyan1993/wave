export interface IImage {
    name: string;
    url: string;
    productId: string;
    publicId: string;
}

export interface IImageResponse extends IImage {
    id: string;
    createdAt: Date | string;
    updatedAt: Date | string;
}

export interface IImageService {
    createImage(image: IImage): Promise<IImageResponse>;
    deleteImage(id: string): Promise<IImageResponse>;
    // getProductById(id: string): Promise<IProductResponse | null>;
    // updateProduct(
    //     id: string,
    //     product: IProductOptional
    // ): Promise<IProductResponse>;
    // deleteProduct(id: string): Promise<IProductResponse>;
    // getProducts({
    //     sortBy,
    //     limit,
    //     order,
    // }: IProductsQueryParams<number>): Promise<IProductResponse[] | null>;
}
