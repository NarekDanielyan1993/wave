import { getAuth } from '@api/auth/[...nextauth]';
import { COMMON_ERROR_TYPES } from '@constant/error';
import { VALIDATION_SOURCES } from '@constant/validation';
import UserService from '@lib/services/user';
import CloudinaryService from '@lib/upload';
import { handleError } from '@utils/error-handler';
import { validateRequest } from '@utils/helper';
import { profileImageDeleteSchema } from 'common/validation/user';
import { fileUploadMiddleware } from 'middlewares/fileUploadMiddleware';
import { NextApiRequest, NextApiResponse } from 'next';
import { Session } from 'next-auth';
import { createRouter } from 'next-connect';
import { IUserService, ProfileImageDeleteBody } from 'types';

export const config = {
    api: {
        bodyParser: false,
    },
};

const router = createRouter<NextApiRequest, NextApiResponse>();

router.post(
    // permissionMiddleware({
    //     resource: PERMISSION_RESOURCES.PROFILE,
    //     permissions: [PERMISSION_ACTION.UPDATE],
    // }),
    fileUploadMiddleware,
    async (req: NextApiRequest, res: NextApiResponse) => {
        try {
            const session = (await getAuth(req, res)) as Session;
            const file = req.file;

            const user: IUserService = new UserService();
            const updatedUser = await user.updateUserProfile(
                session.user.email,
                {
                    url: file.url,
                    publicId: file.publicId,
                }
            );
            res.status(201).json(updatedUser);
        } catch (error) {
            console.log(error);
            handleError(error, res);
        }
    }
);

router.delete(
    // permissionMiddleware({
    //     resource: PERMISSION_RESOURCES.PROFILE,
    //     permissions: [PERMISSION_ACTION.UPDATE],
    // }),
    validateRequest(profileImageDeleteSchema, VALIDATION_SOURCES.QUERY),
    async (req: NextApiRequest, res: NextApiResponse) => {
        try {
            const session = (await getAuth(req, res)) as Session;
            const { publicId } = req.query as ProfileImageDeleteBody;
            const cloudinaryService = new CloudinaryService();
            await cloudinaryService.deleteFile(publicId);
            const user: IUserService = new UserService();
            const updatedUser = await user.updateUserProfile(
                session.user.email,
                {
                    url: '',
                    publicId: '',
                }
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
