import { stringMaxLengthSchema } from '@utils/validator';
import { z } from 'zod';

export const brandValidationSchema = z.object({
    name: stringMaxLengthSchema(),
});

export const updateBrandValidationSchema = z.object({
    name: stringMaxLengthSchema(),
});

export const brandsValidationSchema = z.object({
    limit: z.string().optional(),
    order: z.string().optional(),
    sortBy: z.string().optional(),
});

export const singleBrandValidationSchema = z.object({
    brandId: z.string(),
});

export type brandTypes = z.infer<typeof brandValidationSchema>;
