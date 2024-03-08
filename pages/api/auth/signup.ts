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
import {
    AuthSignUpTypes,
    authSignUpValidationSchema,
} from 'common/validation/auth';
import { NextApiRequest, NextApiResponse } from 'next';
import { createRouter } from 'next-connect';
import { IUserResponse } from 'types';

const router = createRouter<NextApiRequest, NextApiResponse>();

router.post(validateRequest(authSignUpValidationSchema), async (req, res) => {
    try {
        const { email, password, firstName, lastName }: AuthSignUpTypes =
            req.body;
        const userService = new UserService();
        const user = await userService.getByEmail(email);
        if (user && !user.withProvider) {
            throw new ForbiddenError(
                USER_ERROR_TYPES.EMAIL_EXISTS.msg,
                USER_ERROR_TYPES.EMAIL_EXISTS.status
            );
        }
        let newUser = {} as IUserResponse;
        if (user?.withProvider) {
            const hashedPassword = await userService.hashPassword(password);
            newUser = await userService.updateUserProfile(user.email, {
                email,
                password: hashedPassword,
                firstName,
                lastName,
                withProvider: false,
            });
        } else {
            newUser = await userService.createUser({
                email,
                password,
                firstName,
                lastName,
                withProvider: false,
            });
        }

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
