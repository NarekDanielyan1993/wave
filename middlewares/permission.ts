import { ForbiddenError, NotFoundError, handleError } from '@lib/classes';
import UserService from '@lib/services/user';
import UserPermissionService from '@lib/services/userPermission';
import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';

const permissionMiddleware =
    options => async (req: NextApiRequest, res: NextApiResponse, next) => {
        try {
            const { resource, permissions } = options;
            const session = await getSession({ req });

            if (!session) {
                throw new ForbiddenError();
            }

            const userService = new UserService();

            const user = await userService.getByEmail(session.user.email);

            if (!user) {
                throw new NotFoundError('User not found');
            }

            const userRoles = user.roles;

            const userPermissionService = new UserPermissionService();
            const userPermissions =
                await userPermissionService.getPermissionsByRoleAndResource(
                    userRoles,
                    resource
                );
            const hasPermission = userPermissions.some(permission =>
                permissions.includes(permission)
            );

            if (!hasPermission) {
                throw new ForbiddenError('Permission denied');
            }
            return next();
        } catch (error) {
            handleError(error, res);
        }
    };

export default permissionMiddleware;
