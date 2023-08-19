import Joi, { Schema as JoiSchema } from 'joi';

import { emailSchema, passwordSchema } from 'utils';

export interface AuthData {
    email: string;
    password: string;
}

export const authValidationSchema: JoiSchema = Joi.object({
    password: passwordSchema,
    email: emailSchema,
});

export const validateAuthData = <T extends JoiSchema>(
    schema: JoiSchema<T>,
    data: T
): boolean => {
    const { error } = schema.validate(data);
    return !!error;
};
