import { AuthTypes } from 'common/validation/auth';
import { ZodSchema } from 'zod';
export const validateAuthData = <T extends AuthTypes>(
    schema: ZodSchema<T>,
    data: AuthTypes
): boolean => {
    try {
        schema.parse(data);
        return false;
    } catch (error) {
        return true;
    }
};
