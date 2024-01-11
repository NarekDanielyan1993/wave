import { emailSchema } from '@utils/validator';
import { z } from 'zod';

export const siteCreateValidationSchema = z.object({
    address: z.string(),
    hours: z.string(),
    email: emailSchema,
    phone: z.string(),
});

export const siteUpdateValidationSchema = z.object({
    address: z.string().optional(),
    hours: z.string().optional(),
    email: emailSchema.optional(),
    phone: z.string().optional(),
});

export type siteCreateValidationSchemaTypes = z.infer<
    typeof siteCreateValidationSchema
>;
