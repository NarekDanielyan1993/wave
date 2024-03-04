import prismaAdapter from '@lib/db';
import { PrismaClient } from '@prisma/client';
import { ForbiddenError } from '@utils/error-handler';
import { ISiteImage } from 'types/site';
import { ISiteImageResponse, ISiteImageService } from 'types/siteImage';

class SiteImageService implements ISiteImageService {
    private prisma: PrismaClient;

    constructor(prisma: PrismaClient = prismaAdapter) {
        this.prisma = prisma;
    }

    async getImages(): Promise<ISiteImageResponse[] | null> {
        try {
            const images = await this.prisma.siteImage.findMany();
            return images;
        } catch (error) {
            throw new ForbiddenError('Failed to get images.');
        }
    }

    async createImage(image: ISiteImage): Promise<ISiteImageResponse> {
        try {
            const newImage = await this.prisma.siteImage.create({
                data: image,
            });
            return newImage;
        } catch (error) {
            throw new ForbiddenError('Failed to create image.');
        }
    }

    async deleteImage(id: string): Promise<ISiteImageResponse> {
        try {
            const deletedImage = await this.prisma.siteImage.delete({
                where: {
                    id,
                },
            });
            return deletedImage;
        } catch (error) {
            throw new ForbiddenError('Failed to delete image.');
        }
    }
}

export default SiteImageService;
