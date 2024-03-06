import { authOptions } from '@api/auth/[...nextauth]';
import { COMMON_ERROR_TYPES, USER_ERROR_TYPES } from '@constant/error';
import { VALIDATION_SOURCES } from '@constant/validation';
import UserService from '@lib/services/user';
import CloudinaryService from '@lib/upload';
import { NotFoundError, handleError } from '@utils/error-handler';
import { validateRequest } from '@utils/helper';
import { profileGetSchema, updateProfileSchema } from 'common/validation/user';
import { NextApiRequest, NextApiResponse } from 'next';
import { Session, getServerSession } from 'next-auth';
import { createRouter } from 'next-connect';
import { IUserService, UserGetQueryParams } from 'types';

const router = createRouter<NextApiRequest, NextApiResponse>();

router.get(
    // permissionMiddleware({
    //     resource: PERMISSION_RESOURCES.PROFILE,
    //     permissions: [PERMISSION_ACTION.UPDATE],
    // }),
    validateRequest(profileGetSchema, VALIDATION_SOURCES.QUERY),
    async (req, res) => {
        try {
            const { email } = req.query as UserGetQueryParams;

            const userService: IUserService = new UserService();

            const userData = await userService.getProfile(email);
            if (!userData) {
                throw new NotFoundError('Profile not found.');
            }

            res.status(201).json(userData);
        } catch (error) {
            handleError(error, res);
        }
    }
);

router.put(
    // permissionMiddleware({
    //     resource: PERMISSION_RESOURCES.PROFILE,
    //     permissions: [PERMISSION_ACTION.UPDATE],
    // }),
    validateRequest(updateProfileSchema),
    async (req: NextApiRequest, res: NextApiResponse) => {
        try {
            const session = (await getServerSession(
                req,
                res,
                authOptions(req, res)
            )) as Session;
            const { file, ...data } = req.body;
            const userData = data;
            let img;
            if (file) {
                const cloudinaryService = new CloudinaryService();
                img = await cloudinaryService.uploadFile(file);
                userData.url = img.url;
                userData.publicId = img.publicId;
            }
            const user: IUserService = new UserService();
            const updatedUser = await user.updateUserProfile(
                session.user.email,
                userData
            );
            if (!updatedUser) {
                throw new NotFoundError(
                    USER_ERROR_TYPES.USER_NOT_FOUND.msg,
                    USER_ERROR_TYPES.USER_NOT_FOUND.status
                );
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
