export interface ISiteImage {
    name: string;
    url: string;
    publicId: string;
}

export interface ISiteImageResponse extends ISiteImage {
    id: string;
    createdAt: Date | string;
    updatedAt: Date | string;
}

export interface ISiteImageService {
    createImage(image: ISiteImage): Promise<ISiteImageResponse>;
    deleteImage(id: string): Promise<ISiteImageResponse>;
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
