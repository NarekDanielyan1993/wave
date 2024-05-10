import { COMMON_ERROR_TYPES } from '@constant/error';
import ImageService from '@lib/services/image';
import CloudinaryService from '@lib/upload';
import { handleError } from '@utils/error-handler';
import { validateRequest } from '@utils/helper';
import { deleteProductImageValidationSchema } from 'common/validation/product';
import type { NextApiRequest, NextApiResponse } from 'next';
import { createRouter } from 'next-connect';
import { ProductImageDeleteQueryParamsTypes } from 'types/product';

const router = createRouter<NextApiRequest, NextApiResponse>();

router.delete(
    // permissionMiddleware({
    //     resource: PERMISSION_RESOURCES.PROFILE,
    //     permissions: [PERMISSION_ACTION.READ_OWN],
    // }),
    validateRequest(deleteProductImageValidationSchema),
    async (req, res) => {
        try {
            const { publicId } =
                req.query as ProductImageDeleteQueryParamsTypes;
            const imageService = new ImageService();
            const image = await imageService.deleteImage(publicId);
            const cloudinaryService = new CloudinaryService();
            await cloudinaryService.deleteFile(publicId);
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
