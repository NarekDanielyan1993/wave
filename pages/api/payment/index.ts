import { authOptions } from '@api/auth/[...nextauth]';
import { COMMON_ERROR_TYPES } from '@constant/error';
import StripePaymentService from '@lib/payment';
import ProductService from '@lib/services/product';
import UserService from '@lib/services/user';
import {
    InternalServerError,
    NotFoundError,
    handleError,
} from '@utils/error-handler';
import { parseQueryParams } from '@utils/helper';
import type { NextApiRequest, NextApiResponse } from 'next';
import { Session, getServerSession } from 'next-auth';
import { createRouter } from 'next-connect';
import { IUserService } from 'types';
import type {
    IProductModelFields,
    IProductPaymentBody,
    IProductsQueryParams,
} from 'types/product';

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
            const session = (await getServerSession(
                req,
                res,
                authOptions(req, res)
            )) as Session;
            const { amount, products } = req.body as IProductPaymentBody;
            const stripeService = new StripePaymentService();
            const paymentIntent = await stripeService.createPaymentIntent(
                amount
            );

            console.log(paymentIntent);

            const history = products.map(ca => ({
                userId: session.user.id,
                amount: ca.total,
                product: ca.model,
            }));
            const productIds = products.map(pr => pr.id);
            const productService = new ProductService();
            await productService.updateMultipleProducts(productIds, {
                itemsSold: { increment: 1 },
            });
            const user: IUserService = new UserService();
            const updatedHistory = await user.addToHistory(history);
            if (!updatedHistory) {
                throw new InternalServerError();
            }

            const cartsDeleted = await user.removeCart(
                products.map(pr => pr.id)
            );
            if (!cartsDeleted) {
                throw new InternalServerError();
            }
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
