import { authOptions } from '@api/auth/[...nextauth]';
import UserPermissionService from '@lib/services/userPermission';
import { ForbiddenError, handleError } from '@utils/error-handler';
import { NextApiRequest, NextApiResponse } from 'next';
import { Session, getServerSession } from 'next-auth';
import {
    IUserPermissionService,
    PermissionOptions,
    UserPermissionsResponseTypes,
} from 'types';

const permissionMiddleware =
    (options: PermissionOptions) =>
    async (req: NextApiRequest, res: NextApiResponse, next: () => void) => {
        try {
            const { resource, permissions } = options;
            const session: Session | null = await getServerSession(
                req,
                res,
                authOptions(req, res)
            );
            console.log('session', session);
            if (!session) {
                throw new ForbiddenError();
            }
            const userPermissionService: IUserPermissionService =
                new UserPermissionService();
            const userPermissions: UserPermissionsResponseTypes =
                await userPermissionService.getPermissionsByResource(
                    session.user.role,
                    resource
                );
            console.log(userPermissions);
            const hasPermission = userPermissions.actions.some(permission =>
                permissions.includes(permission)
            );

            if (!hasPermission) {
                res.redirect('/');
                return;
                // throw new UnauthorizedError();
            }

            return next();
        } catch (error) {
            handleError(error, res);
        }
    };

export default permissionMiddleware;
