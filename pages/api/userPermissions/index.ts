import { COMMON_ERROR_TYPES } from '@constant/error';
import UserPermissionService from '@lib/services/userPermission';
import { handleError } from '@utils/error-handler';
import { validateRequest } from '@utils/helper';
import { getUserPermissionsSchema } from 'common/validation/user';
import { NextApiRequest, NextApiResponse } from 'next';
import { createRouter } from 'next-connect';
import { GetUserPermissionsQueryBody } from 'types';

const router = createRouter<NextApiRequest, NextApiResponse>();

router.post(validateRequest(getUserPermissionsSchema), async (req, res) => {
    try {
        const { role } = req.body as GetUserPermissionsQueryBody;
        const userPermissionsService = new UserPermissionService();
        const userPermissions = await userPermissionsService.getPermissions(
            role
        );
        res.status(201).json(userPermissions);
    } catch (error) {
        handleError(error, res);
    }
});

const noMatchHandler = (req: NextApiRequest, res: NextApiResponse) => {
    res.status(COMMON_ERROR_TYPES.NOT_FOUND.status).json({
        msg: COMMON_ERROR_TYPES.NOT_FOUND.msg,
    });
};

export default router.handler({
    onNoMatch: noMatchHandler,
});
