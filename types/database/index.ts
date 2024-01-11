import { Prisma } from '@prisma/client';
import { type UppercaseKeys } from 'types/common';

type A<T extends string> = T extends `${infer U}ScalarFieldEnum` ? U : never;
export type Entity = A<keyof typeof Prisma>;
export type Keys<T extends Entity> = Extract<
    keyof (typeof Prisma)[keyof Pick<typeof Prisma, `${T}ScalarFieldEnum`>],
    string
>;

export function prismaExclude<T extends Entity, K extends Keys<T>>(
    type: T,
    omit: K[]
) {
    type Key = Exclude<Keys<T>, K>;
    type TMap = Record<Key, true>;
    const result: TMap = {} as TMap;
    for (const key in Prisma[`${type}ScalarFieldEnum`]) {
        if (!omit.includes(key as K)) {
            result[key as Key] = true;
        }
    }
    return result;
}

export type SearchFilter = {
    name: string;
    value: string;
    keyword: string;
};

export type RangeFilter = {
    name: string;
    min?: number;
    max?: number;
};

export type Filters = {
    baseFilters: FilterOptions;
    relation?: {
        name: string;
        baseFilters: FilterOptions;
    };
};

export type FilterOptions = {
    search?: SearchFilter[];
    range?: RangeFilter[];
};

export type IDatabaseModels = UppercaseKeys<Entity>;
