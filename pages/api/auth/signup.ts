import { SESSION_PROVIDERS } from '@constant/auth';
import { COMMON_ERROR_TYPES, USER_ERROR_TYPES } from '@constant/error';
import { AUTH_ROUTES } from '@constant/route';
import AccountService from '@lib/services/account';
import EmailService from '@lib/services/email';
import UserService from '@lib/services/user';
import VerificationTokenService from '@lib/services/verificationToken';
import {
    ForbiddenError,
    InternalServerError,
    handleError,
} from '@utils/error-handler';
import { validateRequest } from '@utils/helper';
import { AuthTypes, authValidationSchema } from 'common/validation/auth';
import { NextApiRequest, NextApiResponse } from 'next';
import { createRouter } from 'next-connect';
import { IUserResponse } from 'types';

const router = createRouter<NextApiRequest, NextApiResponse>();

router.post(validateRequest(authValidationSchema), async (req, res) => {
    try {
        const { email, password }: AuthTypes = req.body;
        const userService = new UserService();
        const isEmailExists = await userService.getByEmail(email);
        if (isEmailExists) {
            throw new ForbiddenError(
                USER_ERROR_TYPES.EMAIL_EXISTS.msg,
                USER_ERROR_TYPES.EMAIL_EXISTS.status
            );
        }
        const newUser: IUserResponse = await userService.createUser({
            email,
            password,
        });

        const emailToken: string = userService.generateToken(newUser.id);
        const verificationToken = new VerificationTokenService();
        await verificationToken.storeVerificationToken(newUser.id, emailToken);

        const emailService = new EmailService();
        await emailService.sendVerificationRequest(newUser.email, emailToken);

        const accountService = new AccountService();

        const newAccount = accountService.createAccount({
            userId: newUser.id,
            type: SESSION_PROVIDERS.CREDENTIALS,
            provider: SESSION_PROVIDERS.CREDENTIALS,
            providerAccountId: newUser.id,
        });

        if (!newAccount) {
            throw new InternalServerError();
        }

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
