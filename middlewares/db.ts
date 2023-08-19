import { handleError } from '@lib/classes';
import MongoDb from '@lib/classes/database';
import type { NextApiRequest, NextApiResponse } from 'next';

export const dbMiddleware = async (
    req: NextApiRequest,
    res: NextApiResponse,
    next: () => Promise<void>
) => {
    try {
        const mongoDb = new MongoDb();
        await mongoDb.connectToDb();
        await next();
    } catch (error) {
        handleError(error, res);
    }
};
