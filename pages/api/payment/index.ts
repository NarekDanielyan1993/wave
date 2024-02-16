import { COMMON_ERROR_TYPES } from '@constant/error';
import ProductService from '@lib/services/product';
import { NotFoundError, handleError } from '@utils/error-handler';
import { parseQueryParams } from '@utils/helper';
import type { NextApiRequest, NextApiResponse } from 'next';
import { createRouter } from 'next-connect';
import Stripe from 'stripe';
import type { IProductModelFields, IProductsQueryParams } from 'types/product';

const router = createRouter<NextApiRequest, NextApiResponse>();

router.get(
    // permissionMiddleware({
    //     resource: PERMISSION_RESOURCES.PROFILE,
    //     permissions: [PERMISSION_ACTION.READ_OWN],
    // }),
    async (req, res) => {
        try {
            const { limit, order, sortBy } =
                req.query as IProductsQueryParams<string>;
            const data: IProductsQueryParams<number> =
                parseQueryParams<IProductModelFields>({
                    limit,
                    order,
                    sortBy,
                });
            const productService = new ProductService();
            const productData = await productService.getProducts({
                limit: data.limit,
                order: data.order,
                sortBy: data.sortBy,
            });

            if (!productData) {
                throw new NotFoundError('Product not found.');
            }
            res.status(201).json(productData);
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
    // validateRequest(createProductValidationSchema),
    async (req, res) => {
        try {
            const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
                typescript: true,
                apiVersion: '2023-10-16',
            });
            const paymentIntent = await stripe.paymentIntents.create({
                amount: 100,
                currency: 'USD',
            });
            res.status(200).json(paymentIntent);
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