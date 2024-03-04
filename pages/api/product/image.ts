import { COMMON_ERROR_TYPES } from '@constant/error';
import ImageService from '@lib/services/image';
import CloudinaryService from '@lib/upload';
import { handleError } from '@utils/error-handler';
import type { NextApiRequest, NextApiResponse } from 'next';
import { createRouter } from 'next-connect';

const router = createRouter<NextApiRequest, NextApiResponse>();

router.delete(
    // permissionMiddleware({
    //     resource: PERMISSION_RESOURCES.PROFILE,
    //     permissions: [PERMISSION_ACTION.READ_OWN],
    // }),
    // validateRequest(createProductValidationSchema),
    async (req, res) => {
        try {
            const { id, publicId } = req.query;
            let image;
            if (id) {
                const imageService = new ImageService();
                image = await imageService.deleteImage(id);
                const coudinaryService = new CloudinaryService();
                await coudinaryService.deleteFile(publicId);
            }
            res.status(201).json(image);
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
