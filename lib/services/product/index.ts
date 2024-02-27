import { PAGINATION_QUERY_PARAMS_DEFAULT } from '@constant/db';
import prismaAdapter from '@lib/db';
import { PrismaClient } from '@prisma/client';
import { generatePrismaFilters } from '@utils/helper';
import type {
    IPaginatedProductResponse,
    IParsedPaginatedProductsQueryParams,
    IProduct,
    IProductModelSortByFieldsUnion,
    IProductOptional,
    IProductResponse,
    IProductService,
    IProductsQueryParams,
} from 'types/product';

class ProductService implements IProductService {
    private prisma: PrismaClient;

    constructor(prisma: PrismaClient = prismaAdapter) {
        this.prisma = prisma;
    }

    async getProducts({
        sortBy = 'model',
        limit = PAGINATION_QUERY_PARAMS_DEFAULT.limit,
        order = PAGINATION_QUERY_PARAMS_DEFAULT.order,
    }: IProductsQueryParams<number>): Promise<IProductResponse[] | null> {
        const products = await this.prisma.product.findMany({
            orderBy: {
                [sortBy]: order,
            },
            take: limit,
            include: {
                brand: true,
                frets: true,
            },
        });
        return products;
    }

    async getPaginatedProducts({
        sortBy = PAGINATION_QUERY_PARAMS_DEFAULT.sortBy as IProductModelSortByFieldsUnion,
        page = PAGINATION_QUERY_PARAMS_DEFAULT.page,
        limit = PAGINATION_QUERY_PARAMS_DEFAULT.limit,
        order = PAGINATION_QUERY_PARAMS_DEFAULT.order,
        filters,
    }: IParsedPaginatedProductsQueryParams<number>): Promise<IPaginatedProductResponse | null> {
        let filterInput = {};
        if (filters) {
            filterInput = generatePrismaFilters(filters);
        }
        const skip = page * limit;
        const products: IProductResponse[] = await this.prisma.product.findMany(
            {
                skip,
                orderBy: {
                    [sortBy]: order,
                },
                take: limit,
                where: filterInput,
                include: {
                    brand: true,
                    frets: true,
                },
            }
        );

        const totalItems = await this.prisma.product.count({
            where: filterInput,
        });

        const paginationData: IPaginatedProductResponse = {
            totalItems,
            limit,
            page,
            products,
            ...(filters && { filters }),
        };
        return paginationData;
    }

    async createProduct(product: IProduct): Promise<IProductResponse> {
        const newProduct = await this.prisma.product.create({
            data: product,
            include: {
                brand: true,
                frets: true,
            },
        });
        return newProduct;
    }

    async updateProduct(
        id: string,
        product: IProductOptional
    ): Promise<IProductResponse> {
        const updatedProduct = await this.prisma.product.update({
            where: {
                id,
            },
            data: product,
            include: {
                brand: true,
                frets: true,
            },
        });
        return updatedProduct;
    }

    async getProductById(id: string): Promise<IProductResponse | null> {
        const product = await this.prisma.product.findFirst({
            where: {
                id,
            },
            include: {
                brand: true,
                frets: true,
            },
        });
        return product;
    }

    async deleteProduct(id: string): Promise<IProductResponse> {
        const deletedProduct = await this.prisma.product.delete({
            where: {
                id,
            },
            include: {
                brand: true,
                frets: true,
            },
        });
        return deletedProduct;
    }
}

export default ProductService;
