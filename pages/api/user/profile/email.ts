import { getAuth } from '@api/auth/[...nextauth]';
import { COMMON_ERROR_TYPES } from '@constant/error';
import EmailService from '@lib/services/email';
import UserService from '@lib/services/user';
import VerificationTokenService from '@lib/services/verificationToken';
import { handleError } from '@utils/error-handler';
import { validateRequest } from '@utils/helper';
import { profileSchema } from 'common/validation/user';
import { NextApiRequest, NextApiResponse } from 'next';
import { Session } from 'next-auth';
import { createRouter } from 'next-connect';
import { ProfileEmailUpdateBody } from 'types';

const router = createRouter<NextApiRequest, NextApiResponse>();

router.put(
    // permissionMiddleware({
    //     resource: PERMISSION_RESOURCES.PROFILE,
    //     permissions: [PERMISSION_ACTION.UPDATE_OWN],
    // }),
    validateRequest(profileSchema),
    async (req, res) => {
        try {
            const { email } = req.body as ProfileEmailUpdateBody;
            const userService = new UserService();
            const session = (await getAuth(req, res)) as Session;
            const emailToken: string = userService.generateToken(
                session.user.id,
                email
            );

            const verificationToken = new VerificationTokenService();
            await verificationToken.storeVerificationToken(
                session.user.id,
                emailToken
            );

            const emailService = new EmailService();
            await emailService.sendChangeEmailRequest(email, emailToken);
            res.status(201).json({ msg: 'success' });
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
