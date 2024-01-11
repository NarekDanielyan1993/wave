import { PAGINATION_QUERY_PARAMS_DEFAULT } from '@constant/db';
import { COMMON_ERROR_TYPES } from '@constant/error';
import { ALLOWED_FILE_TYPES, MAX_FILE_SIZE } from '@constant/file';
import { VALIDATION_SOURCES } from '@constant/validation';
import type { Prisma } from '@prisma/client';
import { ValidationError, handleError } from '@utils/error-handler';
import bcrypt from 'bcryptjs';
import Cookies, { Cookie } from 'cookies';
import type { NextApiRequest, NextApiResponse } from 'next';
import type {
    FilterOptions,
    Filters,
    ICartsResponse,
    IItemsQueryParams,
    IPaginatedItemsQueryParams,
} from 'types';
import type { ZodRawShape, z } from 'zod';
import { config } from './config';
export async function generateBcryptToken(payload: string, saltRounds = 10) {
    try {
        const salt = await bcrypt.genSalt(saltRounds);
        const hash = await bcrypt.hash(payload, salt);

        return hash;
    } catch (error) {
        throw error;
    }
}

export const calculateTotal = (carts: ICartsResponse[]) =>
    carts.reduce((acc, current) => {
        acc += current.product.price;
        return acc;
    }, 0);

export const isFileExceedsSizeLimit = (file: File) => file.size > MAX_FILE_SIZE;

export const isFileFormatAllowed = (file: File) =>
    ALLOWED_FILE_TYPES.includes(file.type);

export function createCookie(
    req: NextApiRequest,
    res: NextApiResponse,
    name: string,
    value: string,
    options: Partial<Cookie>
) {
    const defaultCookieOptions: Partial<Cookie> = {
        httpOnly: true,
        secure: !config.isDev,
        // sameSite: true,
        maxAge: 3600,
    };
    const cookies = new Cookies(req, res);
    cookies.set(name, value, { ...defaultCookieOptions, ...options });
}

export const validateRequest =
    <T extends ZodRawShape>(
        schema: z.ZodObject<T>,
        source: string = VALIDATION_SOURCES.BODY
    ) =>
    async (req: NextApiRequest, res: NextApiResponse, next: () => void) => {
        try {
            console.log(req);
            const validationData =
                source === VALIDATION_SOURCES.BODY ? req.body : req.query;
            schema.parse(validationData);
            await next();
        } catch (error: any) {
            if (
                error.name ===
                COMMON_ERROR_TYPES.VALIDATION_ERROR.types.zod.name
            ) {
                const validationError = new ValidationError(
                    COMMON_ERROR_TYPES.VALIDATION_ERROR.msg,
                    COMMON_ERROR_TYPES.VALIDATION_ERROR.status,
                    error?.issues?.map((issue: any) => issue.message)
                );
                handleError(validationError, res);
            }
            handleError(error, res);
        }
    };

export const createExpiryFromDate = (time: number, date = Date.now()) =>
    new Date(date + time * 1000);

export function parseQueryParams<T extends string>({
    limit,
    order,
    sortBy,
}: IItemsQueryParams<T, string>): IItemsQueryParams<T, number> {
    const paginationData = {} as IItemsQueryParams<T, number>;
    paginationData.limit = limit
        ? parseInt(limit)
        : PAGINATION_QUERY_PARAMS_DEFAULT.limit;
    paginationData.order = order ?? PAGINATION_QUERY_PARAMS_DEFAULT.order;
    paginationData.sortBy = sortBy
        ? sortBy
        : (PAGINATION_QUERY_PARAMS_DEFAULT.sortBy as T);

    return paginationData;
}

export function withCurrency(
    number: number,
    currency = 'USD',
    decimal = 2,
    symbolPosition = 'front'
): string {
    let formattedNumber;
    formattedNumber = number.toFixed(decimal);

    let currencySymbol = '';
    switch (currency) {
        case 'EUR':
            currencySymbol = '€';
            break;
        default:
            currencySymbol = '$';
            break;
    }

    switch (symbolPosition) {
        case 'front':
            formattedNumber = `${currencySymbol}${formattedNumber}`;
            break;
        case 'back':
            formattedNumber = `${formattedNumber}${currencySymbol}`;
            break;
    }

    return formattedNumber;
}

export function parsePaginatedQueryParams<T extends string>({
    limit,
    order,
    sortBy,
    page,
    filters,
}: IPaginatedItemsQueryParams<T, string>): IPaginatedItemsQueryParams<
    T,
    number
> {
    const paginationData = {} as IPaginatedItemsQueryParams<T, number>;
    paginationData.limit = limit
        ? parseInt(limit)
        : PAGINATION_QUERY_PARAMS_DEFAULT.limit;
    paginationData.page = page
        ? parseInt(page)
        : PAGINATION_QUERY_PARAMS_DEFAULT.page;
    paginationData.order = order ?? PAGINATION_QUERY_PARAMS_DEFAULT.order;
    paginationData.sortBy =
        sortBy ?? (PAGINATION_QUERY_PARAMS_DEFAULT.sortBy as T);

    if (filters) {
        paginationData.filters = JSON.parse(filters);
    }
    console.log(paginationData);
    return paginationData;
}

export const generatePrismaFilters = (
    filters: Filters
): Prisma.ProductWhereInput => {
    const where: Prisma.ProductWhereInput = {};
    const buildFilterOptions = (filterOptions: FilterOptions) => {
        const filterConditions: Prisma.ProductWhereInput[] = [];
        if (filterOptions.search && filterOptions.search.length > 0) {
            filterConditions.push(
                ...filterOptions.search.map(searchFilter => {
                    const { name, value, keyword } = searchFilter;
                    if (name && keyword) {
                        return { [name]: { [keyword]: value } };
                    }
                    return {};
                })
            );
        }
        if (filterOptions.range && filterOptions.range.length > 0) {
            filterConditions.push(
                ...filterOptions.range.map(rangeFilter => {
                    const { name, min, max } = rangeFilter;
                    const filter: Prisma.ProductWhereInput = {};
                    if (name) {
                        if (min !== undefined && max !== undefined) {
                            return { [name]: { gte: min, lte: max } };
                        } else if (min !== undefined) {
                            return { [name]: { gte: min } };
                        } else if (max !== undefined) {
                            return { [name]: { lte: max } };
                        }
                    }
                    return filter;
                })
            );
        }
        return filterConditions;
    };

    const buildRelationFilterOptions = (filterOptions: Filters) => {
        const filterConditions: Prisma.ProductWhereInput[] = [];

        if (
            filterOptions?.relation?.baseFilters?.search &&
            filterOptions?.relation.baseFilters?.search.length > 0
        ) {
            filterConditions.push(
                ...filterOptions.relation.baseFilters.search.map(
                    searchFilter => {
                        const { name, value, keyword } = searchFilter;
                        if (name && keyword) {
                            return {
                                [filterOptions.relation.name]: {
                                    [name]: { [keyword]: value },
                                },
                            };
                        }
                        return {};
                    }
                )
            );
        }

        if (
            filterOptions?.relation?.baseFilters?.range &&
            filterOptions?.relation?.baseFilters?.range.length > 0
        ) {
            filterConditions.push(
                ...filterOptions.relation?.baseFilters.range.map(
                    rangeFilter => {
                        const { name, min, max } = rangeFilter;
                        const filter: Prisma.ProductWhereInput = {};
                        if (name) {
                            if (min !== undefined && max !== undefined) {
                                return { [name]: { gte: min, lte: max } };
                            } else if (min !== undefined) {
                                return { [name]: { gte: min } };
                            } else if (max !== undefined) {
                                return { [name]: { lte: max } };
                            }
                        }
                        return filter;
                    }
                )
            );
        }

        return filterConditions;
    };

    if (
        filters?.baseFilters?.search?.length > 0 ||
        filters?.baseFilters?.range?.length > 0
    ) {
        where.OR = buildFilterOptions(filters.baseFilters);
    }

    if (filters.relation) {
        const relationWhere = buildRelationFilterOptions(filters);

        if (relationWhere.length > 0) {
            where.OR = where.OR || [];
            where.OR.push(...relationWhere);
        }
    }

    return where;
};
