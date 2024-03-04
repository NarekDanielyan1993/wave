import { COMMON_ERROR_TYPES } from '@constant/error';
import { VALIDATION_SOURCES } from '@constant/validation';
import BrandService from '@lib/services/brand';
import {
    InternalServerError,
    NotFoundError,
    handleError,
} from '@utils/error-handler';
import { validateRequest } from '@utils/helper';
import {
    brandValidationSchema,
    singleBrandValidationSchema,
    updateBrandValidationSchema,
} from 'common/validation/brand';
import { NextApiRequest, NextApiResponse } from 'next';
import { createRouter } from 'next-connect';
import { IBrand, IBrandService } from 'types';

const router = createRouter<NextApiRequest, NextApiResponse>();

router.get(
    // permissionMiddleware({
    //     resource: PERMISSION_RESOURCES.PROFILE,
    //     permissions: [PERMISSION_ACTION.READ_OWN],
    // }),
    validateRequest(singleBrandValidationSchema, VALIDATION_SOURCES.QUERY),
    async (req, res) => {
        try {
            const { brandId } = req.query;
            const id = Array.isArray(brandId)
                ? brandId[0]
                : (brandId as string);

            const brandService: IBrandService = new BrandService();

            const brand = await brandService.getBrand(id);

            if (brand) {
                throw new NotFoundError('Brand not found');
            }

            res.status(201).json(brand);
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
    validateRequest(brandValidationSchema),
    async (req, res) => {
        try {
            const brand = req.body;

            const brandService = new BrandService();

            const newBrandData = await brandService.createBrand(brand);

            if (newBrandData) {
                throw new InternalServerError('Failed to add brand');
            }

            res.status(201).json(newBrandData);
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
    validateRequest(updateBrandValidationSchema),
    async (req, res) => {
        try {
            const brand = req.body;
            const { brandId } = req.query;
            const id = Array.isArray(brandId)
                ? brandId[0]
                : (brandId as string);

            const brandService: IBrandService = new BrandService();

            const newBrandData: IBrand = await brandService.updateBrand(
                id,
                brand
            );

            if (!newBrandData) {
                throw new InternalServerError();
            }

            res.status(201).json(newBrandData);
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
    // validateRequest(singleBrandValidationSchema, VALIDATION_SOURCES.QUERY),
    async (req, res) => {
        try {
            const { brandId } = req.query;
            const id = Array.isArray(brandId)
                ? brandId[0]
                : (brandId as string);

            const brandService = new BrandService();

            const brand = await brandService.deleteBrandById(id);
            if (!brand) {
                throw new InternalServerError('Brand not found.');
            }

            res.status(201).json(brand);
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
    validateRequest(singleBrandValidationSchema, VALIDATION_SOURCES.QUERY),
    async (req, res) => {
        try {
            const { brandId } = req.query;
            const id = Array.isArray(brandId)
                ? brandId[0]
                : (brandId as string);

            const user = new BrandService();

            const brand = await user.deleteBrandById(id);

            if (!brand) {
                throw new InternalServerError();
            }

            res.status(201).json(brand);
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
