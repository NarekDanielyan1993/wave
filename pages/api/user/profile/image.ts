import { authOptions } from '@api/auth/[...nextauth]';
import { COMMON_ERROR_TYPES } from '@constant/error';
import UserService from '@lib/services/user';
import CloudinaryService from '@lib/upload';
import { InternalServerError, handleError } from '@utils/error-handler';
import { NextApiRequest, NextApiResponse } from 'next';
import { Session, getServerSession } from 'next-auth';
import { createRouter } from 'next-connect';
import { IUserService } from 'types';

const router = createRouter<NextApiRequest, NextApiResponse>();

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
            const file = req.query;
            const cloudinaryService = new CloudinaryService();
            const img = await cloudinaryService.deleteFile(file);
            const user: IUserService = new UserService();
            const updatedUser = await user.updateUserProfile(
                session.user.email,
                {
                    url: '',
                    publicId: '',
                }
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
