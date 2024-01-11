import { COMMON_ERROR_TYPES } from '@constant/error';
import { PERMISSION_ACTION, PERMISSION_RESOURCES } from '@constant/permission';
import UserService from '@lib/services/user';
import { handleError } from '@utils/error-handler';
import { validateRequest } from '@utils/helper';
import permissionMiddleware from 'middlewares/permission';
import { NextApiRequest, NextApiResponse } from 'next';
import { createRouter } from 'next-connect';
import { profileSchema } from './validationSchema';

const router = createRouter<NextApiRequest, NextApiResponse>();

router.put(
    permissionMiddleware({
        resource: PERMISSION_RESOURCES.PROFILE,
        permissions: [PERMISSION_ACTION.UPDATE_OWN],
    }),
    validateRequest(profileSchema),
    async (req, res) => {
        try {
            const { email: newEmail } = req.body;
            const user = new UserService();

            const updatedUser = await user.updateUserEmail(
                newEmail,
                req.session.user.email
            );

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
