import prismaAdapter from '@lib/db';
import { PrismaClient } from '@prisma/client';
import { IImage, IImageResponse, IImageService } from 'types/image';

class ImageService implements IImageService {
    private prisma: PrismaClient;

    constructor(prisma: PrismaClient = prismaAdapter) {
        this.prisma = prisma;
    }

    async getImages(): Promise<IImageResponse[] | null> {
        const images = await this.prisma.image.findMany();
        return images;
    }

    async createImage(image: IImage): Promise<IImageResponse> {
        console.log(image);
        const newImage = await this.prisma.image.create({
            data: image,
        });
        return newImage;
    }

    // async updateProduct(
    //     id: string,
    //     product: IProductOptional
    // ): Promise<IProductResponse> {
    //     const updatedProduct = await this.prisma.product.update({
    //         where: {
    //             id,
    //         },
    //         data: product,
    //         include: {
    //             brand: true,
    //         },
    //     });
    //     return updatedProduct;
    // }

    // async getProductById(id: string): Promise<IProductResponse | null> {
    //     const product = await this.prisma.product.findFirst({
    //         where: {
    //             id,
    //         },
    //         include: {
    //             brand: true,
    //         },
    //     });
    //     return product;
    // }

    async deleteImage(id: string): Promise<IImageResponse> {
        const deletedImage = await this.prisma.image.delete({
            where: {
                id,
            },
        });
        return deletedImage;
    }
}

export default ImageService;
