import { COMMON_ERROR_TYPES } from '@constant/error';
import UserService from '@lib/services/user';
import { handleError } from '@utils/error-handler';
import { validateRequest } from '@utils/helper';
import { profileSchema } from 'common/validation/user';
import { NextApiRequest, NextApiResponse } from 'next';
import { createRouter } from 'next-connect';
import { ProfileEmailUpdateBody } from 'types';

const router = createRouter<NextApiRequest, NextApiResponse>();

router.put(
    // permissionMiddleware({
    //     resource: PERMISSION_RESOURCES.PROFILE,
    //     permissions: [PERMISSION_ACTION.UPDATE_OWN],
    // }),
    validateRequest(profileSchema),
    async (req, res) => {
        try {
            const { email } = req.body as ProfileEmailUpdateBody;
            const user = new UserService();

            const updatedUser = await user.updateUserEmail(
                email,
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
