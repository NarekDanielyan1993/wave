import { COMMON_ERROR_TYPES } from '@constant/error';
import ImageService from '@lib/services/image';
import ProductService from '@lib/services/product';
import { NotFoundError, handleError } from '@utils/error-handler';
import { parsePaginatedQueryParams } from '@utils/helper';
import type { NextApiRequest, NextApiResponse } from 'next';
import { createRouter } from 'next-connect';
import type {
    IPaginatedProductsQueryParams,
    IProductModelFields,
} from 'types/product';

const router = createRouter<NextApiRequest, NextApiResponse>();

router.get(
    // permissionMiddleware({
    //     resource: PERMISSION_RESOURCES.PROFILE,
    //     permissions: [PERMISSION_ACTION.READ_OWN],
    // }),
    async (req, res) => {
        try {
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
            console.log('productData', productData);

            const imageService = new ImageService();
            const images = await imageService.getImages();

            if (!productData) {
                throw new NotFoundError('Product not found.');
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
