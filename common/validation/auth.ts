import {
    emailSchema,
    passwordSchema,
    stringRequiredWithMaxLengthSchema,
} from '@utils/validator';
import { z } from 'zod';

export const authSignUpValidationSchema = z.object({
    password: passwordSchema,
    email: emailSchema,
    firstName: stringRequiredWithMaxLengthSchema(20),
    lastName: stringRequiredWithMaxLengthSchema(20),
});

export const authSignInValidationSchema = z.object({
    password: passwordSchema,
    email: emailSchema,
});

export type AuthSignUpTypes = z.infer<typeof authSignUpValidationSchema>;
export type AuthSignInTypes = z.infer<typeof authSignInValidationSchema>;
