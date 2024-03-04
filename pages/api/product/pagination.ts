import { authOptions } from '@api/auth/[...nextauth]';
import { COMMON_ERROR_TYPES } from '@constant/error';
import ImageService from '@lib/services/image';
import ProductService from '@lib/services/product';
import { NotFoundError, handleError } from '@utils/error-handler';
import { parsePaginatedQueryParams } from '@utils/helper';
import { Session } from 'inspector';
import type { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import { createRouter } from 'next-connect';
import type {
    IPaginatedProductsQueryParams,
    IProductModelFields,
} from 'types/product';

const router = createRouter<NextApiRequest, NextApiResponse>();

router.get(
    // permissionMiddleware({
    //     resource: PERMISSION_RESOURCES.PRODUCT,
    //     permissions: [PERMISSION_ACTION.READ],
    // }),
    async (req, res) => {
        try {
            const session: Session | null = await getServerSession(
                req,
                res,
                authOptions(req, res)
            );
            console.log('session', session);
            const { limit, order, sortBy, page, filters } =
                req.query as IPaginatedProductsQueryParams<string>;
            const data: IPaginatedProductsQueryParams<number> =
                parsePaginatedQueryParams<IProductModelFields>({
                    limit,
                    order,
                    sortBy,
                    page,
                    filters,
                });
            const productService = new ProductService();
            const productData = await productService.getPaginatedProducts({
                limit: data.limit,
                page: data.page,
                order: data.order,
                sortBy: data.sortBy,
                filters: data.filters,
            });

            const imageService = new ImageService();
            const images = await imageService.getImages();

            if (!productData) {
                throw new NotFoundError('Products not found.');
            }
            res.status(201).json({ ...productData, images });
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
