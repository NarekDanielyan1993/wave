import { COMMON_ERROR_TYPES } from '@constant/error';
import { VALIDATION_SOURCES } from '@constant/validation';
import ProductService from '@lib/services/product';
import {
    InternalServerError,
    NotFoundError,
    handleError,
} from '@utils/error-handler';
import { validateRequest } from '@utils/helper';
import {
    deleteProductValidationSchema,
    updateProductValidationSchema,
} from 'common/validation/product';
import type { NextApiRequest, NextApiResponse } from 'next';
import { createRouter } from 'next-connect';
import type {
    IProductOptional,
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
    validateRequest(updateProductValidationSchema),
    async (req, res) => {
        try {
            const productData: IProductOptional = req.body;
            const { productId } = req.query as ProductGetQueryParamsTypes;

            const productService: IProductService = new ProductService();

            const product = await productService.updateProduct(
                productId,
                productData
            );

            if (!product) {
                throw new NotFoundError('Product not Found');
            }

            res.status(201).json(product);
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
    validateRequest(deleteProductValidationSchema, VALIDATION_SOURCES.QUERY),
    async (req, res) => {
        try {
            const { productId } = req.query as ProductGetQueryParamsTypes;
            const productService = new ProductService();

            const product = await productService.deleteProduct(productId);

            if (!product) {
                throw new NotFoundError('Product not Found');
            }

            res.status(201).json(product);
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
