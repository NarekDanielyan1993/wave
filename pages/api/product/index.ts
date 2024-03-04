import { COMMON_ERROR_TYPES } from '@constant/error';
import ImageService from '@lib/services/image';
import ProductService from '@lib/services/product';
import CloudinaryService from '@lib/upload';
import {
    ForbiddenError,
    NotFoundError,
    handleError,
} from '@utils/error-handler';
import { parseQueryParams, validateRequest } from '@utils/helper';
import { addEditProductSchema } from 'common/validation/product';
import type { NextApiRequest, NextApiResponse } from 'next';
import { createRouter } from 'next-connect';
import type {
    IProductBody,
    IProductModelFields,
    IProductService,
    IProductsQueryParams,
} from 'types/product';

const router = createRouter<NextApiRequest, NextApiResponse>();

router.get(
    // permissionMiddleware({
    //     resource: PERMISSION_RESOURCES.PRODUCT,
    //     permissions: [PERMISSION_ACTION.READ],
    // }),
    async (req, res) => {
        try {
            // const session: Session | null = await getServerSession(
            //     req,
            //     res,
            //     authOptions(req, res)
            // );
            // console.log(session);
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
    //     resource: PERMISSION_RESOURCES.PRODUCT,
    //     permissions: [PERMISSION_ACTION.CREATE],
    // }),
    validateRequest(addEditProductSchema),
    async (req, res) => {
        try {
            const { file, ...productData }: IProductBody = req.body;
            const productService: IProductService = new ProductService();
            const newProductData = await productService.createProduct({
                ...productData,
            });
            let image;
            if (file) {
                const cloudinaryService = new CloudinaryService();
                const img = await cloudinaryService.uploadFile(file.url);
                const imageService = new ImageService();
                image = await imageService.createImage({
                    name: file.name,
                    url: img.url,
                    publicId: img.publicId,
                    productId: newProductData.id,
                });
            }
            if (newProductData) {
                throw new ForbiddenError('Failed to add product.');
            }

            res.status(201).json({ product: newProductData, image });
        } catch (error) {
            handleError(error, res);
        }
    }
);

router.delete(
    // permissionMiddleware({
    //     resource: PERMISSION_RESOURCES.PRODUCT,
    //     permissions: [PERMISSION_ACTION.DELETE],
    // }),
    async (req, res) => {
        try {
            const { id } = req.query;
            if (id) {
                const imageService = new ImageService();
                await imageService.deleteImage(id);
            }
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
