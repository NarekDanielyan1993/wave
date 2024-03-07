import { COMMON_ERROR_TYPES } from '@constant/error';
import { VALIDATION_SOURCES } from '@constant/validation';
import UserService from '@lib/services/user';
import { InternalServerError, handleError } from '@utils/error-handler';
import { validateRequest } from '@utils/helper';
import {
    cartCreateSchema,
    cartDeleteSchema,
    cartGetSchema,
} from 'common/validation/user';
import type { NextApiRequest, NextApiResponse } from 'next';
import { createRouter } from 'next-connect';
import type { CartCreateBody, CartDeleteBody, IUserService } from 'types';

const router = createRouter<NextApiRequest, NextApiResponse>();

router.post(
    // permissionMiddleware({
    //     resource: PERMISSION_RESOURCES.PROFILE,
    //     permissions: [PERMISSION_ACTION.UPDATE],
    // }),
    validateRequest(cartCreateSchema),
    async (req: NextApiRequest, res: NextApiResponse) => {
        try {
            const data = req.body as CartCreateBody;
            const userService: IUserService = new UserService();
            const createdUser = await userService.addToCart(data);
            if (!createdUser) {
                throw new InternalServerError();
            }
            res.status(201).json(createdUser);
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
    validateRequest(cartGetSchema, VALIDATION_SOURCES.QUERY),
    async (req: NextApiRequest, res: NextApiResponse) => {
        try {
            const { userId } = req.query;
            const user: IUserService = new UserService();
            const carts = await user.getCarts(userId);
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
    validateRequest(cartDeleteSchema),
    async (req: NextApiRequest, res: NextApiResponse) => {
        try {
            const data = req.body as CartDeleteBody;
            const user: IUserService = new UserService();
            const carts = await user.removeCart(data.ids);
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
