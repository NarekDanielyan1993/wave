import { emailSchema } from '@utils/validator';
import { z } from 'zod';

export const profileSchema = z.object({
    email: emailSchema,
});

export const updateProfileSchema = z.object({
    firstname: z.string().optional(),
    lastname: z.string().optional(),
    // history: z.array()
    // cart: z.array()
});
