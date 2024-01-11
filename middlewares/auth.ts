import { AUTH_ERRORS_MESSAGES } from '@constant/error';
import { ForbiddenError, handleError } from '@utils/error-handler';
import type { NextApiRequest, NextApiResponse } from 'next';
import { getToken } from 'next-auth/jwt';

export const authMiddleware = async (
    req: NextApiRequest,
    res: NextApiResponse,
    next: () => Promise<void>
) => {
    try {
        const token = await getToken({ req });
        if (!token) {
            throw new ForbiddenError(AUTH_ERRORS_MESSAGES.AUTH_FAILED);
        }
        return await next();
    } catch (error) {
        handleError(error, res);
    }
};
