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
        if (!userToken) {
            return res.redirect(AUTH_ROUTES.BASE);
        }
        const decodedToken: ITokenPayload = jwt.verify(
            userToken,
            config.NEXTAUTH_SECRET as string
        ) as ITokenPayload;

        if (!decodedToken) {
            return res.redirect(AUTH_ROUTES.BASE);
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
            await verificationTokenService.removeVerificationToken(
                verificationTokenData.id
            );
            throw new InternalServerError();
        }

        const isExpired = verificationTokenService.isEmailChangeTokenExpired(
            verificationTokenData.expires
        );

        if (isExpired) {
            await verificationTokenService.removeVerificationToken(
                verificationTokenData.id
            );
            throw new InternalServerError('Token is expired.');
        }
        console.log(decodedToken);
        const userService = new UserService();
        await userService.updateById(decodedToken.id, {
            email: decodedToken.email,
        });

        await verificationTokenService.removeVerificationToken(
            verificationTokenData.id
        );

        const hashToken = await generateBcryptToken(
            config.NEXTAUTH_SECRET as string
        );

        createCookie(req, res, 'authToken', hashToken, {
            expires: expiresInMinute,
        });
        res.setHeader('Set-Cookie', [
            'next-auth.session-token=deleted; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT',
            '__Secure-next-auth.session-token=deleted; path=/; Secure; expires=Thu, 01 Jan 1970 00:00:00 GMT',
        ]);
        return res.redirect(AUTH_ROUTES.BASE);
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
