import { authOptions } from '@api/auth/[...nextauth]';
import { COMMON_ERROR_TYPES } from '@constant/error';
import { PERMISSION_ACTION, PERMISSION_RESOURCES } from '@constant/permission';
import UserService from '@lib/services/user';
import {
    ForbiddenError,
    InternalServerError,
    handleError,
} from '@utils/error-handler';
import { validateRequest } from '@utils/helper';
import permissionMiddleware from 'middlewares/permission';
import { NextApiRequest, NextApiResponse } from 'next';
import { Session, getServerSession } from 'next-auth';
import { createRouter } from 'next-connect';
import { IUserService, UserGetQueryParams } from 'types';
import { updateProfileSchema } from './validationSchema';

const router = createRouter<NextApiRequest, NextApiResponse>();

router.get(
    // permissionMiddleware({
    //     resource: PERMISSION_RESOURCES.PROFILE,
    //     permissions: [PERMISSION_ACTION.READ],
    // }),
    async (req, res) => {
        try {
            const { email } = req.query as UserGetQueryParams;
            if (!email) {
                throw new ForbiddenError();
            }

            const user: IUserService = new UserService();

            const userData = await user.getProfile(email);
            if (!userData) {
                throw new InternalServerError();
            }

            res.status(201).json(userData);
        } catch (error) {
            handleError(error, res);
        }
    }
);

router.put(
    permissionMiddleware({
        resource: PERMISSION_RESOURCES.PROFILE,
        permissions: [PERMISSION_ACTION.UPDATE],
    }),
    validateRequest(updateProfileSchema),
    async (req: NextApiRequest, res: NextApiResponse) => {
        try {
            const session = (await getServerSession(
                req,
                res,
                authOptions(req, res)
            )) as Session;
            const data = req.body;
            const user: IUserService = new UserService();
            const updatedUser = await user.updateUserProfile(
                session.user.email,
                data
            );
            if (!updatedUser) {
                throw new InternalServerError();
            }
            res.status(201).json(updatedUser);
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
