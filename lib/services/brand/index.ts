import { PAGINATION_QUERY_PARAMS_DEFAULT } from '@constant/db';
import prismaAdapter from '@lib/db';
import { PrismaClient } from '@prisma/client';
import {
    IBrand,
    IBrandQueryParams,
    IBrandResponse,
    IBrandService,
} from 'types';

class BrandService implements IBrandService {
    private prisma: PrismaClient;

    constructor(prisma: PrismaClient = prismaAdapter) {
        this.prisma = prisma;
    }

    async getBrand(id: string): Promise<IBrandResponse | null> {
        const brand = await this.prisma.brand.findFirst({
            where: {
                id,
            },
        });
        return brand;
    }

    async createBrand(brand: IBrand): Promise<IBrandResponse> {
        const newBrand = await this.prisma.brand.create({
            data: brand,
        });
        return newBrand;
    }

    async updateBrand(id: string, brand: IBrand): Promise<IBrandResponse> {
        const newBrand = await this.prisma.brand.update({
            where: {
                id,
            },
            data: brand,
        });
        return newBrand;
    }

    async getBrands({
        sortBy = PAGINATION_QUERY_PARAMS_DEFAULT.sortBy,
        limit = PAGINATION_QUERY_PARAMS_DEFAULT.limit,
        order = PAGINATION_QUERY_PARAMS_DEFAULT.order,
    }: IBrandQueryParams<number>): Promise<IBrandResponse[] | null> {
        const brand = await this.prisma.brand.findMany({
            orderBy: {
                [sortBy]: order,
            },
            take: limit,
        });
        return brand;
    }

    async deleteBrandById(id: string): Promise<IBrandResponse | null> {
        const brand = await this.prisma.brand.delete({
            where: {
                id,
            },
        });
        return brand;
    }
}

export default BrandService;
