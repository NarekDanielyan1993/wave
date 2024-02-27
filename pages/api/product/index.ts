import { COMMON_ERROR_TYPES } from '@constant/error';
import ImageService from '@lib/services/image';
import ProductService from '@lib/services/product';
import CloudinaryService from '@lib/upload';
import {
    InternalServerError,
    NotFoundError,
    handleError,
} from '@utils/error-handler';
import { parseQueryParams } from '@utils/helper';
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

            const imageService = new ImageService();
            const images = await imageService.getImages();

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
            if (!newProductData) {
                throw new InternalServerError();
            }

            res.status(201).json({ product: newProductData, image });
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
    // validateRequest(createProductValidationSchema),
    async (req, res) => {
        try {
            const { id, productId } = req.query;
            console.log('productId', productId);
            if (id) {
                const imageService = new ImageService();
                const image = await imageService.deleteImage(id);
                console.log(image);
            }

            // cloudinary.config({
            //     cloud_name: config.CLOU,
            //     api_key: config.NEXT_PUBLIC_API_KEY,
            //     api_secret: config.NEXT_PUBLIC_API_SECRET,
            // });

            // cloudinary.v2.uploader
            //     .destroy(publicId, function (error, result) {
            //         console.log(result, error);
            //     })
            //     .then(resp => console.log(resp))
            //     .catch(_err =>
            //         console.log('Something went wrong, please try again later.')
            //     );

            // if (!newProductData) {
            //     throw new InternalServerError();
            // }
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
