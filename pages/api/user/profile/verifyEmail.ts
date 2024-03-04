import { expiresInMinute } from '@constant/cookie';
import { COMMON_ERROR_TYPES } from '@constant/error';
import { AUTH_ROUTES } from '@constant/route';
import UserService from '@lib/services/user';
import VerificationTokenService from '@lib/services/verificationToken';
import { config } from '@utils/config';
import { InternalServerError, handleError } from '@utils/error-handler';
import { createCookie, generateBcryptToken } from '@utils/helper';
import jwt from 'jsonwebtoken';
import { NextApiRequest, NextApiResponse } from 'next';
import { createRouter } from 'next-connect';
import { ITokenPayload } from 'types';
import { IVerificationToken } from 'types/verificationToken';

const router = createRouter<NextApiRequest, NextApiResponse>();

router.get(async (req, res) => {
    try {
        const { token } = req.query;
        const userToken = Array.isArray(token) ? token[0] : (token as string);
        const decodedToken: ITokenPayload = jwt.verify(
            userToken,
            config.NEXTAUTH_SECRET
        ) as ITokenPayload;
        if (!decodedToken) {
            throw new InternalServerError();
        }

        const verificationTokenService = new VerificationTokenService();

        const verificationTokenData: IVerificationToken | null =
            await verificationTokenService.getByIdentifier(decodedToken.id);

        if (!verificationTokenData) {
            throw new InternalServerError();
        }

        const isValid = verificationTokenService.validateToken(
            userToken,
            verificationTokenData.token
        );
        if (!isValid) {
            throw new InternalServerError();
        }

        const isExpired =
            verificationTokenService.isEmailVerificationTokenExpired(
                decodedToken.exp,
                verificationTokenData.expires
            );

        if (isExpired) {
            throw new InternalServerError('Token is expired.');
        }
        const userService = new UserService();
        const updatedUser = await userService.verifyEmail(decodedToken.id);
        if (!updatedUser) {
            //TODO  Redirect to email expired page
            throw new InternalServerError();
        }
        //TODO REMOVE VERFICATION TOKEN FROM TABLE
        // await verificationTokenService.removeVerificationToken(decodedToken.id);
        const hashToken = await generateBcryptToken(config.NEXTAUTH_SECRET);
        createCookie(req, res, 'authToken', hashToken, {
            expires: expiresInMinute,
        });
        return res.redirect(AUTH_ROUTES.SIGN_UP_COMPLETION);
    } catch (error) {
        handleError(error, res);
    }
});

const noMatchHandler = (req: NextApiRequest, res: NextApiResponse) => {
    res.status(COMMON_ERROR_TYPES.NOT_FOUND.status).json({
        msg: COMMON_ERROR_TYPES.NOT_FOUND.msg,
    });
};

export default router.handler({
    onNoMatch: noMatchHandler,
});
