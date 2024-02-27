import prismaAdapter from '@lib/db';
import { PrismaClient } from '@prisma/client';
import { ISiteImage } from 'types/site';
import { ISiteImageResponse, ISiteImageService } from 'types/siteImage';

class SiteImageService implements ISiteImageService {
    private prisma: PrismaClient;

    constructor(prisma: PrismaClient = prismaAdapter) {
        this.prisma = prisma;
    }

    async getImages(): Promise<ISiteImageResponse[] | null> {
        const images = await this.prisma.siteImage.findMany();
        return images;
    }

    async createImage(image: ISiteImage): Promise<ISiteImageResponse> {
        const newImage = await this.prisma.siteImage.create({
            data: image,
        });
        return newImage;
    }

    async deleteImage(id: string): Promise<ISiteImageResponse> {
        const deletedImage = await this.prisma.siteImage.delete({
            where: {
                id,
            },
        });
        return deletedImage;
    }
}

export default SiteImageService;
