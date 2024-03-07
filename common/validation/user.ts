import {
    emailSchema,
    stringRequiredWithMaxLengthSchema,
} from '@utils/validator';
import { z } from 'zod';

export const profileSchema = z.object({
    email: emailSchema,
});

export const profileGetSchema = z.object({
    id: z.string(),
});

export const updateProfileSchema = z.object({
    firstname: z.string().optional(),
    lastname: z.string().optional(),
});

export const cartCreateSchema = z.object({
    userId: z.string(),
    productId: z.string(),
});

export const cartGetSchema = z.object({
    userId: z.string(),
});

export const cartDeleteSchema = z.object({
    ids: z.array(z.string()),
});

export const profileHistoryCreateSchema = z.object({
    history: z.array(
        z.object({
            userId: z.string(),
            product: z.string(),
            amount: z.number(),
        })
    ),
});

export const profileHistoryGetSchema = z.object({
    userId: z.string(),
});

export const profileImageDeleteSchema = z.object({
    publicId: z.string(),
});

export const userProfileEmailValidationSchema = z.object({
    email: emailSchema,
});

export const getUserPermissionsSchema = z.object({
    role: z.string(),
});

export const userProfileValidationSchema = z.object({
    firstName: stringRequiredWithMaxLengthSchema(20),
    lastName: stringRequiredWithMaxLengthSchema(20),
});

export type UserProfileValidationTypes = z.infer<
    typeof userProfileValidationSchema
>;

export type UserProfileEmailValidationTypes = z.infer<
    typeof userProfileEmailValidationSchema
>;
