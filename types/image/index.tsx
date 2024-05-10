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
    deleteImage(publicId: string): Promise<IImageResponse>;
}
