import { DEFAULT_VALIDATION_ERRORS } from '@constant/error';
import { z } from 'zod';

export const passwordSchema = z
    .string()
    .nonempty({ message: DEFAULT_VALIDATION_ERRORS.required })
    .refine(
        value =>
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
                value
            ),
        { message: DEFAULT_VALIDATION_ERRORS.pattern_password }
    );

export const emailSchema = z
    .string()
    .nonempty({ message: DEFAULT_VALIDATION_ERRORS.required })
    .email({ message: DEFAULT_VALIDATION_ERRORS.email })
    .nonempty();

export const stringMaxLengthSchema = (maxLength = 60) =>
    z.string().max(maxLength, {
        message: 'Exceeds string maximum length of characters.',
    });
