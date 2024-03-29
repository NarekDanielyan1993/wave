import { COMMON_ERROR_TYPES } from '@constant/error';
import SiteImageService from '@lib/services/siteImage';
import CloudinaryService from '@lib/upload';
import { ForbiddenError, handleError } from '@utils/error-handler';
import { validateRequest } from '@utils/helper';
import {
    siteImageCreateValidationSchema,
    siteImageDeleteValidationSchema,
} from 'common/validation/site';
import { NextApiRequest, NextApiResponse } from 'next';
import { createRouter } from 'next-connect';
import { ISiteDeleteImageBody, ISiteImage } from 'types/site';

const router = createRouter<NextApiRequest, NextApiResponse>();

router.get(
    // permissionMiddleware({
    //     resource: PERMISSION_RESOURCES.PROFILE,
    //     permissions: [PERMISSION_ACTION.READ_OWN],
    // }),
    async (req, res) => {
        try {
            const siteImageService = new SiteImageService();
            const images = await siteImageService.getImages();
            res.status(201).json(images);
        } catch (error) {
            handleError(error, res);
        }
    }
);

router.post(
    // permissionMiddleware({
    //     resource: PERMISSION_RESOURCES.PROFILE,
    //     permissions: [PERMISSION_ACTION.READ_OWN],
    // }),
    validateRequest(siteImageCreateValidationSchema),
    async (req, res) => {
        try {
            const site = req.body as ISiteImage;
            const cloudinaryService = new CloudinaryService();
            const img = await cloudinaryService.uploadFile(site.url);
            const siteImageService = new SiteImageService();
            const siteImage = await siteImageService.createImage({
                name: site.name,
                url: img.url,
                publicId: img.publicId,
            });
            if (!siteImage) {
                throw new ForbiddenError('Failed to upload image.');
            }

            res.status(201).json(siteImage);
        } catch (error) {
            handleError(error, res);
        }
    }
);

router.delete(
    // permissionMiddleware({
    //     resource: PERMISSION_RESOURCES.PROFILE,
    //     permissions: [PERMISSION_ACTION.READ_OWN],
    // }),
    validateRequest(siteImageDeleteValidationSchema),
    async (req, res) => {
        try {
            const { id, publicId } = req.body as ISiteDeleteImageBody;
            const coudinaryService = new CloudinaryService();
            await coudinaryService.deleteFile(publicId);
            const siteImageService = new SiteImageService();
            const siteImage = await siteImageService.deleteImage(id);
            res.status(201).json(siteImage);
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

export const config = {
    api: {
        bodyParser: {
            sizeLimit: '2mb', // Set desired value here
        },
    },
};
