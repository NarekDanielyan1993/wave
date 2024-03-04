import { COMMON_ERROR_TYPES } from '@constant/error';
import FretService from '@lib/services/fret';
import { NotFoundError, handleError } from '@utils/error-handler';
import { parsePaginatedQueryParams } from '@utils/helper';
import type { NextApiRequest, NextApiResponse } from 'next';
import { createRouter } from 'next-connect';
import {
    IFretModelFields,
    IPaginatedFretsQueryParams,
    IParsedPaginatedFretsQueryParams,
} from 'types/fret';

const router = createRouter<NextApiRequest, NextApiResponse>();

router.get(
    // permissionMiddleware({
    //     resource: PERMISSION_RESOURCES.PROFILE,
    //     permissions: [PERMISSION_ACTION.READ_OWN],
    // }),
    async (req, res) => {
        try {
            const { limit, order, sortBy, page, filters } =
                req.query as IPaginatedFretsQueryParams<string>;
            const data: IParsedPaginatedFretsQueryParams<number> =
                parsePaginatedQueryParams<IFretModelFields>({
                    limit,
                    order,
                    sortBy,
                    page,
                    filters,
                });
            const fretsService = new FretService();
            const fretsData = await fretsService.getPaginatedFrets({
                limit: data.limit,
                page: data.page,
                order: data.order,
                sortBy: data.sortBy,
                filters: data.filters,
            });

            if (!fretsData) {
                throw new NotFoundError('Frets not found.');
            }
            res.status(201).json(fretsData);
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
