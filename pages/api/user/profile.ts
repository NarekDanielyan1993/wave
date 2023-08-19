import { COMMON_ERROR_TYPES } from '@constant/error';
import { handleError } from '@lib/classes';
import UserService from '@lib/services/user';
import { dbMiddleware } from 'middlewares';
import { NextApiRequest, NextApiResponse } from 'next';
import { createRouter } from 'next-connect';

const router = createRouter();

router.use(dbMiddleware);

router.get(async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const { email } = req.query;

        const userEmail = Array.isArray(email) ? email[0] : email;

        const user = new UserService();

        const userData = await user.getProfile(userEmail);

        res.status(201).json(userData);
    } catch (error) {
        handleError(error, res);
    }
});

const noMatchHandler = (req: NextApiRequest, res: NextApiResponse) => {
    res.status(COMMON_ERROR_TYPES.NOT_FOUND.status).json({
        msg: COMMON_ERROR_TYPES.NOT_FOUND.msg,
    });
};

export default router.handler({
    onNoMatch: noMatchHandler,
});
