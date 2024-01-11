import { COMMON_ERROR_TYPES } from '@constant/error';
import SiteService from '@lib/services/site';
import { NotFoundError, handleError } from '@utils/error-handler';
import { validateRequest } from '@utils/helper';
import {
    siteCreateValidationSchema,
    siteUpdateValidationSchema,
} from 'common/validation/site';
import { NextApiRequest, NextApiResponse } from 'next';
import { createRouter } from 'next-connect';
import { ISite, siteQueryParams } from 'types/site';

const router = createRouter<NextApiRequest, NextApiResponse>();

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

router.put(
    // permissionMiddleware({
    //     resource: PERMISSION_RESOURCES.PROFILE,
    //     permissions: [PERMISSION_ACTION.READ_OWN],
    // }),
    validateRequest(siteUpdateValidationSchema),
    async (req, res) => {
        try {
            const site = req.body as ISite;
            const { siteId } = req.query as siteQueryParams;
            const siteService = new SiteService();
            const updatedData = await siteService.updateSiteArgs(siteId, site);

            if (!updatedData) {
                throw new NotFoundError('Site not found.');
            }

            res.status(201).json(updatedData);
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
