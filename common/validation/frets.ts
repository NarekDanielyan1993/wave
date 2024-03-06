import { DEFAULT_VALIDATION_ERRORS } from '@constant/error';
import { z } from 'zod';

export const createUpdateFretsValidationSchema = z.object({
    frets: z.string(),
});

export const getProductValidationSchema = z.object({
    id: z.string(),
});

export const deleteFretsValidationSchema = z.object({
    productId: z.string(),
});

export const addEditFretsSchema = z.object({
    frets: z
        .string({ invalid_type_error: DEFAULT_VALIDATION_ERRORS.required })
        .min(1, { message: DEFAULT_VALIDATION_ERRORS.required })
        .refine(value => !Number.isNaN(Number(value)), 'Input number')
        .refine(value => Number(value) > 0, 'Input positive number'),
});

export type addEditFretsSchemaTypes = z.infer<typeof addEditFretsSchema>;
