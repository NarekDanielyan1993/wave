import { COMMON_ERROR_TYPES } from '@constant/error';
import { VALIDATION_SOURCES } from '@constant/validation';
import UserService from '@lib/services/user';
import { InternalServerError, handleError } from '@utils/error-handler';
import { validateRequest } from '@utils/helper';
import {
    profileHistoryCreateSchema,
    profileHistoryGetSchema,
} from 'common/validation/user';
import type { NextApiRequest, NextApiResponse } from 'next';
import { createRouter } from 'next-connect';
import type {
    IProfileHistoryCreateBody,
    IProfileHistoryGetQueryParams,
    IUserService,
} from 'types';

const router = createRouter<NextApiRequest, NextApiResponse>();

router.post(
    // permissionMiddleware({
    //     resource: PERMISSION_RESOURCES.PROFILE,
    //     permissions: [PERMISSION_ACTION.UPDATE],
    // }),
    validateRequest(profileHistoryCreateSchema),
    async (req: NextApiRequest, res: NextApiResponse) => {
        try {
            const history = req.body as IProfileHistoryCreateBody[];
            const user: IUserService = new UserService();
            const updatedUser = await user.addToHistory(history);
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
    validateRequest(profileHistoryGetSchema, VALIDATION_SOURCES.QUERY),
    async (req: NextApiRequest, res: NextApiResponse) => {
        try {
            const { userId } = req.query as IProfileHistoryGetQueryParams;
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

const noMatchHandler = (req: NextApiRequest, res: NextApiResponse) => {
    res.status(COMMON_ERROR_TYPES.NOT_FOUND.status).json({
        msg: COMMON_ERROR_TYPES.NOT_FOUND.msg,
    });
};

export default router.handler({
    onNoMatch: noMatchHandler,
});
