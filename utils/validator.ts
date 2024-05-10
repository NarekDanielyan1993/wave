import { DEFAULT_VALIDATION_ERRORS } from '@constant/error';
import { z } from 'zod';

export const passwordSchema = z
    .string()
    .min(1, { message: DEFAULT_VALIDATION_ERRORS.required })
    .refine(value => /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{3,}$/.test(value), {
        message: DEFAULT_VALIDATION_ERRORS.pattern_password,
    });

export const emailSchema = z
    .string()
    .min(1, { message: DEFAULT_VALIDATION_ERRORS.required })
    .email({ message: DEFAULT_VALIDATION_ERRORS.email });

export const positiveNumberSchema = z
    .string({ invalid_type_error: DEFAULT_VALIDATION_ERRORS.required })
    .min(1, { message: DEFAULT_VALIDATION_ERRORS.required })
    .refine(value => !Number.isNaN(Number(value)), 'Input number')
    .refine(value => Number(value) > 0, 'Input positive number')
    .transform(value => Number(value));

export const positiveNumberRequiredSchema = z.coerce
    .number()
    .gt(0, { message: DEFAULT_VALIDATION_ERRORS.required });

export const stringMaxLengthSchema = (maxLength = 60) =>
    z.string().max(maxLength, {
        message: 'Exceeds string maximum length of characters.',
    });

export const stringRequiredWithMaxLengthSchema = (maxLength = 60) =>
    z
        .string()
        .min(1, {
            message: DEFAULT_VALIDATION_ERRORS.required,
        })
        .max(maxLength, {
            message: 'Exceeds string maximum length of characters.',
        });
