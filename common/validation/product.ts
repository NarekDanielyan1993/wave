import { DEFAULT_VALIDATION_ERRORS } from '@constant/error';
import { positiveNumberSchema } from '@utils/validator';
import { z } from 'zod';

export const createProductValidationSchema = z.object({
    model: z.string(),
    brandId: z.string(),
    fretId: z.number(),
    woodType: z.string(),
    description: z.string(),
    price: z.number(),
    available: z.number(),
    itemsSold: z.number(),
    shipping: z.boolean().optional(),
    images: z.array(z.string()).default([]),
});

export const getProductValidationSchema = z.object({
    id: z.string(),
});

export const updateProductValidationSchema = z.object({
    model: z.string().optional(),
    brandId: z.string().optional(),
    frets: z.number().optional(),
    woodType: z.string().optional(),
    description: z.string().optional(),
    price: z.number().optional(),
    available: z.number().optional(),
    itemsSold: z.number().optional(),
    shipping: z.boolean().optional(),
    images: z.array(z.string()).optional(),
});

export const deleteProductValidationSchema = z.object({
    productId: z.string(),
});

export const productsValidationSchema = z.object({
    limit: z.string().optional(),
    order: z.string().optional(),
    sortBy: z.string().optional(),
});

export const paginatedProductsValidationSchema =
    productsValidationSchema.extend({
        page: z.number(),
    });

export const productsSearchValidationSchema = z.object({
    search: z.string(),
});

export const editProductSchema = z.object({
    model: z.string(),
    available: z.coerce.number().nullable(),
});

export const addEditProductSchema = z.object({
    model: z.string().min(1, { message: DEFAULT_VALIDATION_ERRORS.required }),
    available: positiveNumberSchema,
    fretId: z.string(),
    price: z
        .string({ invalid_type_error: DEFAULT_VALIDATION_ERRORS.required })
        .min(1, { message: DEFAULT_VALIDATION_ERRORS.required })
        .refine(value => !Number.isNaN(Number(value)), 'Input number')
        .refine(value => Number(value) > 0, 'Input positive number')
        .transform(value => Number(value)),
    woodType: z.string(),
    description: z
        .string()
        .min(1, { message: DEFAULT_VALIDATION_ERRORS.required }),
    file: z
        .object({
            name: z.string(),
            url: z.string(),
        })
        .nullable(),
    shipping: z.boolean(),
    brand: z.string(),
});

export type productSearchValidationTypes = z.infer<
    typeof productsSearchValidationSchema
>;

export type editProductSchemaTypes = z.infer<typeof editProductSchema>;

export type addEditProductSchemaTypes = z.infer<typeof addEditProductSchema>;
