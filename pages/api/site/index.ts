import { COMMON_ERROR_TYPES } from '@constant/error';
import SiteService from '@lib/services/site';
import { NotFoundError, handleError } from '@utils/error-handler';
import { validateRequest } from '@utils/helper';
import { siteCreateValidationSchema } from 'common/validation/site';
import { NextApiRequest, NextApiResponse } from 'next';
import { createRouter } from 'next-connect';
import { ISite } from 'types/site';

const router = createRouter<NextApiRequest, NextApiResponse>();

router.get(
    // permissionMiddleware({
    //     resource: PERMISSION_RESOURCES.PROFILE,
    //     permissions: [PERMISSION_ACTION.READ_OWN],
    // }),
    async (req, res) => {
        try {
            const siteService = new SiteService();
            const siteData = await siteService.getSiteArgs();

            if (!siteData) {
                throw new NotFoundError('Product not found.');
            }

            res.status(201).json(siteData);
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
    validateRequest(siteCreateValidationSchema),
    async (req, res) => {
        try {
            const site = req.body as ISite;
            const siteService = new SiteService();
            const siteData = await siteService.createSite(site);

            if (!siteData) {
                throw new NotFoundError('Site not found.');
            }

            res.status(201).json(siteData);
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
