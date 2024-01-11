import prismaAdapter from '@lib/db';
import { PrismaClient, UserRole } from '@prisma/client';
import {
    IUserPermissionService,
    UserPermissionResourcesTypes,
    UserPermissionsResponseTypes,
} from 'types';

class UserPermissionService implements IUserPermissionService {
    private prisma: PrismaClient;

    constructor(prisma: PrismaClient = prismaAdapter) {
        this.prisma = prisma;
    }

    async getPermissionsByResource(
        role: UserRole,
        resource: UserPermissionResourcesTypes
    ): Promise<UserPermissionsResponseTypes> {
        const userPermissionActions =
            (await this.prisma.userPermission.findFirst({
                where: {
                    role,
                    ...(resource && { resource }),
                },
                select: {
                    resource: true,
                    actions: true,
                },
            })) as UserPermissionsResponseTypes;
        return userPermissionActions;
    }

    async getPermissions(
        role: UserRole
    ): Promise<UserPermissionsResponseTypes[]> {
        const userPermissionActions =
            (await this.prisma.userPermission.findMany({
                where: {
                    role,
                },
                select: {
                    resource: true,
                    actions: true,
                },
            })) as UserPermissionsResponseTypes[];
        console.log(userPermissionActions);
        return userPermissionActions;
    }
}

export default UserPermissionService;
