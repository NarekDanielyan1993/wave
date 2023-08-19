import { AUTH_ENCRYPTION_LENGTH } from '@constant/auth';
import { COMMON_ERROR_TYPES } from '@constant/error';
import { ValidationError, handleError } from '@lib/classes';
import { compare, hash } from 'bcryptjs';
import { Schema } from 'joi';
import type { NextApiRequest, NextApiResponse } from 'next';

export const hashPassword = async (password: string) =>
    await hash(password, AUTH_ENCRYPTION_LENGTH);

export const verifyPassword = async (
    password: string,
    hashedPassword: string
) => await compare(password, hashedPassword);

export const validateRequest =
    (schema: Schema) =>
    async (
        req: NextApiRequest,
        res: NextApiResponse,
        next: () => Promise<void>
    ) => {
        try {
            const { error } = await schema.validate(req.body, {
                abortEarly: false,
            });

            if (error) {
                const errors = error.details.reduce((acc, err) => {
                    acc.push(err.message);

                    return acc;
                }, [] as string[]);
                const validationError = new ValidationError(
                    COMMON_ERROR_TYPES.VALIDATION_ERROR.msg,
                    COMMON_ERROR_TYPES.VALIDATION_ERROR.status,
                    errors
                );

                throw validationError;
            } else {
                await next();
            }
        } catch (error) {
            handleError(error, res);
        }
    };
