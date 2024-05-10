import { DEFAULT_VALIDATION_ERRORS } from '@constant/error';
import { positiveNumberRequiredSchema } from '@utils/validator';
import { z } from 'zod';

export const createUpdateProductValidationSchema = z.object({
    model: z.string(),
    brandId: z.string(),
    fretId: z.string(),
    woodType: z.string(),
    description: z.string(),
    price: z.number(),
    available: z.number(),
    shipping: z.boolean().optional(),
    file: z
        .object({
            name: z.string(),
            url: z.string(),
        })
        .nullable(),
});

export const getProductValidationSchema = z.object({
    id: z.string(),
});

export const deleteProductValidationSchema = z.object({
    productId: z.string(),
});

export const deleteProductImageValidationSchema = z.object({
    id: z.string(),
    publicId: z.string(),
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
    available: positiveNumberRequiredSchema,
    fretId: z.string(),
    price: z
        .string()
        .min(1, { message: DEFAULT_VALIDATION_ERRORS.required })
        .transform(val => Number(val.replace(/[^\d.-]/g, ''))),
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
