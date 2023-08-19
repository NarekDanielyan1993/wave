import { COMMON_ERROR_TYPES, USER_ERROR_TYPES } from '@constant/error';
import { ForbiddenError, handleError } from '@lib/classes';
import UserService from '@lib/services/user';
import { dbMiddleware } from 'middlewares';
import { NextApiRequest, NextApiResponse } from 'next';
import { createRouter } from 'next-connect';
import { validateRequest } from 'utils';
import { AuthData, authValidationSchema } from './auth.validator';

const router = createRouter();

router.use(dbMiddleware);

router.post(
    validateRequest(authValidationSchema),
    async (req: NextApiRequest, res: NextApiResponse) => {
        try {
            const { email, password }: AuthData = req.body;
            const user = new UserService();
            const isEmailExists = await user.getByEmail(email);
            if (isEmailExists) {
                throw new ForbiddenError(
                    USER_ERROR_TYPES.EMAIL_EXISTS.msg,
                    USER_ERROR_TYPES.EMAIL_EXISTS.status
                );
            }
            await user.createUser({ email, password });
            res.status(201).json({ message: 'success' });
        } catch (error) {
            handleError(error, res);
        }
    }
);

const noMatchHandler = (req: NextApiRequest, res: NextApiResponse) => {
    res.status(COMMON_ERROR_TYPES.NOT_FOUND.status).json({
        msg: COMMON_ERROR_TYPES.NOT_FOUND.msg,
    });
};

export default router.handler({
    onNoMatch: noMatchHandler,
});
