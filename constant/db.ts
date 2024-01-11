import { Prisma } from '@prisma/client';
import { IDatabaseModels, IUserModelFields } from 'types';
import { IProductModelSortByFields } from 'types/product';

// TODO ADD MODELS
export const DATABASE_MODELS: Pick<IDatabaseModels, 'USER' | 'PERMISSION'> = {
    USER: Prisma.ModelName.User,
    PERMISSION: Prisma.ModelName.Permission,
};

export const USER_MODEL_FIELDS: Pick<IUserModelFields, 'PASSWORD'> = {
    PASSWORD: 'password',
};

export const PRODUCT_MODEL_FIELDS: Partial<IProductModelSortByFields> = {};

export const PAGINATION_QUERY_PARAMS_DEFAULT = {
    limit: 10,
    order: 'asc',
    page: 0,
    sortBy: 'createdAt',
} as const;

export const PAGINATION_QUERY_FILTER_PARAMS_DEFAULT = {
    range: [],
    keyword: {},
    selectIn: [],
};
