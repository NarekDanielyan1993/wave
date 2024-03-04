import { authOptions } from '@api/auth/[...nextauth]';
import { COMMON_ERROR_TYPES } from '@constant/error';
import UserService from '@lib/services/user';
import { InternalServerError, handleError } from '@utils/error-handler';
import type { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession, type Session } from 'next-auth';
import { createRouter } from 'next-connect';
import type { IUserService } from 'types';

const router = createRouter<NextApiRequest, NextApiResponse>();

router.post(
    // permissionMiddleware({
    //     resource: PERMISSION_RESOURCES.PROFILE,
    //     permissions: [PERMISSION_ACTION.UPDATE],
    // }),
    // validateRequest(updateProfileSchema),
    async (req: NextApiRequest, res: NextApiResponse) => {
        try {
            const session = (await getServerSession(
                req,
                res,
                authOptions(req, res)
            )) as Session;
            const { history } = req.body;
            const user: IUserService = new UserService();
            const updatedUser = await user.addToHistory(history);
            if (!updatedUser) {
                throw new InternalServerError();
            }
            res.status(201).json(updatedUser);
        } catch (error) {
            handleError(error, res);
        }
    }
);

router.get(
    // permissionMiddleware({
    //     resource: PERMISSION_RESOURCES.PROFILE,
    //     permissions: [PERMISSION_ACTION.UPDATE],
    // }),
    // validateRequest(updateProfileSchema),
    async (req: NextApiRequest, res: NextApiResponse) => {
        try {
            const session = (await getServerSession(
                req,
                res,
                authOptions(req, res)
            )) as Session;
            const { userId } = req.query;
            const user: IUserService = new UserService();
            const carts = await user.getHistory(userId);
            if (!carts) {
                throw new InternalServerError();
            }
            res.status(201).json(carts);
        } catch (error) {
            handleError(error, res);
        }
    }
);

router.delete(
    // permissionMiddleware({
    //     resource: PERMISSION_RESOURCES.PROFILE,
    //     permissions: [PERMISSION_ACTION.UPDATE],
    // }),
    // validateRequest(updateProfileSchema),
    async (req: NextApiRequest, res: NextApiResponse) => {
        try {
            const session = (await getServerSession(
                req,
                res,
                authOptions(req, res)
            )) as Session;
            const { id } = req.query;
            const user: IUserService = new UserService();
            const carts = await user.removeCart(id);
            if (!carts) {
                throw new InternalServerError();
            }
            res.status(201).json(carts);
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
