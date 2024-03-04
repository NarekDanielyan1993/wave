import { COMMON_ERROR_TYPES } from '@constant/error';
import { VALIDATION_SOURCES } from '@constant/validation';
import BrandService from '@lib/services/brand';
import { NotFoundError, handleError } from '@utils/error-handler';
import { parseQueryParams, validateRequest } from '@utils/helper';
import { brandsValidationSchema } from 'common/validation/brand';
import { NextApiRequest, NextApiResponse } from 'next';
import { createRouter } from 'next-connect';
import { IBrandModelFields, IBrandQueryParams } from 'types';

const router = createRouter<NextApiRequest, NextApiResponse>();

router.get(
    // permissionMiddleware({
    //     resource: PERMISSION_RESOURCES.PROFILE,
    //     permissions: [PERMISSION_ACTION.READ_OWN],
    // }),
    validateRequest(brandsValidationSchema, VALIDATION_SOURCES.QUERY),
    async (req, res) => {
        try {
            const { limit, order, sortBy } =
                req.query as IBrandQueryParams<string>;
            const data: IBrandQueryParams<number> =
                parseQueryParams<IBrandModelFields>({
                    limit,
                    order,
                    sortBy,
                });
            const brandService = new BrandService();

            const brandData = await brandService.getBrands({
                sortBy: data.sortBy,
                limit: data.limit,
                order: data.order,
            });

            if (!brandData) {
                throw new NotFoundError('Brands not found');
            }

            res.status(201).json(brandData);
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
