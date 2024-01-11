// import { prismaAdapter } from '@lib/db';
import prismaAdapter from '@lib/db';
import { PrismaClient } from '@prisma/client';
import { Account } from 'types';
import { IAccountService } from 'types/account';

class AccountService implements IAccountService {
    private prisma: PrismaClient;

    constructor(prisma: PrismaClient = prismaAdapter) {
        this.prisma = prisma;
    }

    async createAccount({
        userId,
        type,
        provider,
        providerAccountId,
        refresh_token,
        access_token,
        expires_at,
        token_type,
        scope,
        id_token,
        session_state,
    }: Account): Promise<void> {
        await this.prisma.account.create({
            data: {
                userId,
                type,
                provider,
                providerAccountId,
                refresh_token,
                access_token,
                expires_at,
                token_type,
                scope,
                id_token,
                session_state,
            },
        });
    }
}

export default AccountService;
