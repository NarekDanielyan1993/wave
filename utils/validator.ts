import { DEFAULT_VALIDATION_ERRORS } from '@constant/error';
import Joi from 'joi';

export const passwordSchema = Joi.string()
    .pattern(
        new RegExp(
            '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$'
        )
    )
    .required()
    .messages({ ...DEFAULT_VALIDATION_ERRORS });

export const emailSchema = Joi.string()
    .email({ tlds: { allow: false } })
    .messages(DEFAULT_VALIDATION_ERRORS);
