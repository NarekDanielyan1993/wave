import { COMMON_ERROR_TYPES } from '@constant/error';
import { VALIDATION_SOURCES } from '@constant/validation';
import FretService from '@lib/services/fret';
import ProductService from '@lib/services/product';
import {
    ForbiddenError,
    InternalServerError,
    handleError,
} from '@utils/error-handler';
import { validateRequest } from '@utils/helper';
import {
    createUpdateFretsValidationSchema,
    deleteFretsValidationSchema,
} from 'common/validation/frets';
import type { NextApiRequest, NextApiResponse } from 'next';
import { createRouter } from 'next-connect';
import { FretsGetQueryParamsTypes, IFretBody, IFretService } from 'types/fret';
import type {
    IProductService,
    ProductGetQueryParamsTypes,
} from 'types/product';

const router = createRouter<NextApiRequest, NextApiResponse>();

router.get(async (req, res) => {
    try {
        const { productId } = req.query as ProductGetQueryParamsTypes;
        const productService: IProductService = new ProductService();

        const productData = await productService.getProductById(productId);

        if (!productData) {
            throw new InternalServerError();
        }

        res.status(201).json(productData);
    } catch (error) {
        handleError(error, res);
    }
});

router.put(
    // permissionMiddleware({
    //     resource: PERMISSION_RESOURCES.PROFILE,
    //     permissions: [PERMISSION_ACTION.READ_OWN],
    // }),
    validateRequest(createUpdateFretsValidationSchema),
    async (req, res) => {
        try {
            const fretsData: IFretBody = req.body;
            const { fretId } = req.query as FretsGetQueryParamsTypes;
            const fretsService: IFretService = new FretService();

            const fret = await fretsService.updateFrets(fretId, fretsData);

            if (fret) {
                throw new ForbiddenError('Failed to edit fret.');
            }

            res.status(201).json(fret);
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
    validateRequest(deleteFretsValidationSchema, VALIDATION_SOURCES.QUERY),
    async (req, res) => {
        try {
            const { fretId } = req.query as FretsGetQueryParamsTypes;
            const fretsService = new FretService();

            const frets = await fretsService.deleteFrets(fretId);

            res.status(201).json(frets);
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
