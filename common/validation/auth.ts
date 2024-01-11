import { emailSchema, passwordSchema } from '@utils/validator';
import { z } from 'zod';

export const authValidationSchema = z.object({
    password: passwordSchema,
    email: emailSchema,
});

export type AuthTypes = z.infer<typeof authValidationSchema>;
