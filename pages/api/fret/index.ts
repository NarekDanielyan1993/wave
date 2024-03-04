import { COMMON_ERROR_TYPES } from '@constant/error';
import FretService from '@lib/services/fret';
import { ForbiddenError, handleError } from '@utils/error-handler';
import type { NextApiRequest, NextApiResponse } from 'next';
import { createRouter } from 'next-connect';
import { IFretBody, IFretService } from 'types/fret';

const router = createRouter<NextApiRequest, NextApiResponse>();

router.post(
    // permissionMiddleware({
    //     resource: PERMISSION_RESOURCES.PROFILE,
    //     permissions: [PERMISSION_ACTION.READ_OWN],
    // }),
    // validateRequest(createProductValidationSchema),
    async (req, res) => {
        try {
            const fretsData: IFretBody = req.body;
            const fretService: IFretService = new FretService();
            const newFretData = await fretService.createFrets({
                ...fretsData,
            });
            if (!newFretData) {
                throw new ForbiddenError('Failed to add frets.');
            }

            res.status(201).json(newFretData);
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
