import { PAGINATION_QUERY_PARAMS_DEFAULT } from '@constant/db';
import prismaAdapter from '@lib/db';
import { PrismaClient } from '@prisma/client';
import { InternalServerError } from '@utils/error-handler';
import { generatePrismaFilters } from '@utils/helper';
import {
    IFret,
    IFretModelSortByFieldsUnion,
    IFretResponse,
    IFretService,
    IPaginatedFretsResponse,
    IParsedPaginatedFretsQueryParams,
} from 'types/fret';

class FretService implements IFretService {
    private prisma: PrismaClient;

    constructor(prisma: PrismaClient = prismaAdapter) {
        this.prisma = prisma;
    }

    async getPaginatedFrets({
        sortBy = PAGINATION_QUERY_PARAMS_DEFAULT.sortBy as IFretModelSortByFieldsUnion,
        page = PAGINATION_QUERY_PARAMS_DEFAULT.page,
        limit = PAGINATION_QUERY_PARAMS_DEFAULT.limit,
        order = PAGINATION_QUERY_PARAMS_DEFAULT.order,
        filters,
    }: IParsedPaginatedFretsQueryParams<number>): Promise<IPaginatedFretsResponse | null> {
        try {
            let filterInput = {};
            if (filters) {
                filterInput = generatePrismaFilters(filters);
            }
            const skip = page * limit;
            const frets: IFretResponse[] = await this.prisma.frets.findMany({
                skip,
                orderBy: {
                    [sortBy]: order,
                },
                take: limit,
                where: filterInput,
            });

            const totalItems = await this.prisma.frets.count({
                where: filterInput,
            });

            const paginationData: IPaginatedFretsResponse = {
                totalItems,
                limit,
                page,
                frets,
                ...(filters && { filters }),
            };
            return paginationData;
        } catch (error) {
            throw new InternalServerError('Failed to get frets.');
        }
    }

    async createFrets(frets: IFret): Promise<IFretResponse> {
        try {
            const newFrets = await this.prisma.frets.create({
                data: frets,
            });
            return newFrets;
        } catch (error) {
            throw new InternalServerError('Failed to update frets.');
        }
    }

    async updateFrets(id: string, frets: IFret): Promise<IFretResponse> {
        try {
            const updatedFrets = await this.prisma.frets.update({
                where: {
                    id,
                },
                data: frets,
            });
            return updatedFrets;
        } catch (error) {
            throw new InternalServerError('Failed to update frets.');
        }
    }

    async deleteFrets(id: string): Promise<IFretResponse> {
        try {
            const deletedFrets = await this.prisma.frets.delete({
                where: {
                    id,
                },
            });
            return deletedFrets;
        } catch (error) {
            throw new InternalServerError('Failed to delete frets.');
        }
    }
}

export default FretService;
