import { VALIDATION_ERRORS } from '@constant/error';
import { emailSchema } from '@utils/validator';
import { z } from 'zod';

export const userProfileEmailValidationSchema = z.object({
    email: emailSchema,
});

export const userProfileValidationSchema = z
    .object({
        firstname: z.string(),
        lastname: z.string(),
    })
    .superRefine((values, ctx) => {
        if (!values.firstname && !values.lastname) {
            ctx.addIssue({
                message: VALIDATION_ERRORS.PROFILE.UNION,
                code: z.ZodIssueCode.custom,
                path: ['firstname'],
            });
            ctx.addIssue({
                message: VALIDATION_ERRORS.PROFILE.UNION,
                code: z.ZodIssueCode.custom,
                path: ['lastname'],
            });
        }
    });

export type UserProfileValidationTypes = z.infer<
    typeof userProfileValidationSchema
>;

export type UserProfileEmailValidationTypes = z.infer<
    typeof userProfileEmailValidationSchema
>;
