import { ForbiddenError, handleError } from '@utils/error-handler';
import type { NextApiRequest, NextApiResponse } from 'next';
import { getToken } from 'next-auth/jwt';
import { NextHandler } from 'next-connect';

export const authMiddleware = async (
    req: NextApiRequest,
    res: NextApiResponse,
    next: NextHandler
) => {
    try {
        const token = await getToken({ req });
        if (!token) {
            throw new ForbiddenError();
        }
        return await next();
    } catch (error) {
        handleError(error, res);
    }
};
