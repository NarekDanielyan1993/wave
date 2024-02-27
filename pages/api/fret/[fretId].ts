import { COMMON_ERROR_TYPES } from '@constant/error';
import FretService from '@lib/services/fret';
import ProductService from '@lib/services/product';
import {
    InternalServerError,
    NotFoundError,
    handleError,
} from '@utils/error-handler';
import type { NextApiRequest, NextApiResponse } from 'next';
import { createRouter } from 'next-connect';
import { FretsGetQueryParamsTypes, IFretBody, IFretService } from 'types/fret';
import type {
    IProductService,
    ProductGetQueryParamsTypes,
} from 'types/product';

const router = createRouter<NextApiRequest, NextApiResponse>();

router.get(
    // permissionMiddleware({
    //     resource: PERMISSION_RESOURCES.PROFILE,
    //     permissions: [PERMISSION_ACTION.READ_OWN],
    // }),
    // validateRequest(getProductValidationSchema, VALIDATION_SOURCES.QUERY),
    async (req, res) => {
        try {
            const { productId } = req.query as ProductGetQueryParamsTypes;
            console.log(productId);
            const productService: IProductService = new ProductService();

            const productData = await productService.getProductById(productId);

            if (!productData) {
                throw new InternalServerError();
            }

            res.status(201).json(productData);
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
    // validateRequest(updateProductValidationSchema),
    async (req, res) => {
        try {
            const fretsData: IFretBody = req.body;
            const { fretId } = req.query as FretsGetQueryParamsTypes;
            const fretsService: IFretService = new FretService();

            const fret = await fretsService.updateFrets(fretId, fretsData);

            if (!fret) {
                throw new NotFoundError('Frets not Found');
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
    // validateRequest(deleteProductValidationSchema, VALIDATION_SOURCES.QUERY),
    async (req, res) => {
        try {
            const { fretId } = req.query as FretsGetQueryParamsTypes;
            console.log(fretId);
            const fretsService = new FretService();

            const frets = await fretsService.deleteFrets(fretId);

            if (!frets) {
                throw new NotFoundError('Frets not Found');
            }

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
