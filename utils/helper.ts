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
    FilterRelation,
    Filters,
    ICarts,
    IItemsQueryParams,
    IPaginatedItemsQueryParams,
    IParsedPaginatedITemsQueryParams,
} from 'types';
import type { ZodRawShape, z } from 'zod';
import { config } from './config';

export const isObject = (item: unknown): item is object =>
    typeof item === 'object' &&
    !Array.isArray(item) &&
    !(item instanceof Date) &&
    item !== null;

export const isExists = <T>(item: T | undefined | null): item is T =>
    typeof item !== 'undefined' && item !== null;

export const isDateObject = (item: unknown): item is Date =>
    typeof item === 'object' && item instanceof Date;

export const isObjectEmpty = (obj: object) => {
    if (!isObject(obj)) {
        return true;
    }

    return Object.getOwnPropertyNames(obj).length === 0;
};

export function isDeepEqual(
    obj1: Record<string, unknown>,
    obj2: Record<string, unknown>
): boolean {
    if (!isObject(obj1) || !isObject(obj2)) {
        return false;
    }
    const keys1 = Object.keys(obj1);
    const keys2 = Object.keys(obj2);

    if (keys1.length !== keys2.length) {
        return false;
    }

    return keys1.reduce((isEqual, key) => {
        if (isEqual === false) {
            return false;
        }

        const isObjects = isObject(obj1[key]) && isObject(obj2[key]);
        if (isObjects) {
            return isDeepEqual(
                obj1[key] as Record<string, unknown>,
                obj2[key] as Record<string, unknown>
            );
        }

        return obj1[key] === obj2[key];
    }, true);
}

export function isDeepEqualArray(
    arr1: Record<string, unknown>[],
    arr2: Record<string, unknown>[]
): boolean {
    if (arr1.length !== arr2.length) {
        return false;
    }

    return arr1.every((obj1, index) => {
        const obj2 = arr2[index];
        return isDeepEqual(obj1, obj2);
    });
}

export async function readFile(f: File): Promise<string> {
    return new Promise(resolve => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result as string);
        reader.readAsDataURL(f);
    });
}

export const dataUrlToFile = (url: string, fileName: string) => {
    const i = url.indexOf('base64,');
    const buffer = Buffer.from(url.slice(i + 7), 'base64');
    const file = new File([buffer], fileName, { type: 'image/png' });
    return file;
};

export async function generateBcryptToken(payload: string, saltRounds = 10) {
    try {
        const salt = await bcrypt.genSalt(saltRounds);
        const hash = await bcrypt.hash(payload, salt);

        return hash;
    } catch (error) {
        throw error;
    }
}

export const calculateTotal = (carts: ICarts) =>
    carts.products.reduce((acc, current) => {
        acc += current.price;
        return acc;
    }, 0);

export const isFileExceedsSizeLimit = (fileSize: number) =>
    fileSize > MAX_FILE_SIZE;

export const isFileFormatAllowed = (type: string) =>
    ALLOWED_FILE_TYPES.includes(type);

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
                return handleError(validationError, res);
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
    if (typeof number !== 'number') {
        return '';
    }
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
}: IPaginatedItemsQueryParams<T, string>): IParsedPaginatedITemsQueryParams<
    T,
    number
> {
    const paginationData = {} as IParsedPaginatedITemsQueryParams<T, number>;
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
                    const { name, value, keyword, keywords } = searchFilter;
                    return {
                        [name]: {
                            [keyword]: value,
                            ...(keywords &&
                                keywords.reduce((acc, key) => {
                                    acc[key.keyword] = key.value;
                                    return acc;
                                }, {})),
                        },
                    };
                })
            );
        }
        if (filterOptions.range && filterOptions.range.length > 0) {
            filterConditions.push(
                ...filterOptions.range.map(rangeFilter => {
                    const { name, min, max } = rangeFilter;
                    const filter: Prisma.ProductWhereInput = {};
                    if (min !== undefined && max !== undefined) {
                        return { [name]: { gte: min, lte: max } };
                    } else if (min !== undefined) {
                        return { [name]: { gte: min } };
                    } else if (max !== undefined) {
                        return { [name]: { lte: max } };
                    }
                    return filter;
                })
            );
        }
        return filterConditions;
    };

    const buildRelationFilterOptions = (filterOptions: FilterRelation) => {
        const filterConditions: Prisma.ProductWhereInput[] = [];
        if (filterOptions.search && filterOptions.search.length > 0) {
            filterConditions.push(
                ...filterOptions.search.map(searchFilter => {
                    const { relationName, name, value, keyword } = searchFilter;
                    return {
                        [relationName]: {
                            [name]: { [keyword]: value },
                        },
                    };
                })
            );
        }

        if (filterOptions.range && filterOptions.range.length > 0) {
            filterConditions.push(
                ...filterOptions.range.map(rangeFilter => {
                    const { name, min, max } = rangeFilter;
                    const filter: Prisma.ProductWhereInput = {};
                    if (min !== undefined && max !== undefined) {
                        return { [name]: { gte: min, lte: max } };
                    } else if (min !== undefined) {
                        return { [name]: { gte: min } };
                    } else if (max !== undefined) {
                        return { [name]: { lte: max } };
                    }
                    return filter;
                })
            );
        }
        return filterConditions;
    };

    if (
        (filters.baseFilters.search && filters.baseFilters.search.length > 0) ||
        (filters.baseFilters.range && filters.baseFilters.range.length > 0)
    ) {
        where.AND = buildFilterOptions(filters.baseFilters);
    }

    if (filters.relation) {
        const relationWhere = buildRelationFilterOptions(filters.relation);

        if (relationWhere.length > 0) {
            where.AND = where.AND || [];
            where.AND.push(...relationWhere);
        }
    }

    return where;
};

export function capitalizeFirstLetter(string: string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
