import { EMAIL_VERIFICATION_TOKEN_EXPIRATION_DATE } from '@constant/auth';
import prismaAdapter from '@lib/db';
import { PrismaClient } from '@prisma/client';
import {
    IVerificationToken,
    IVerificationTokenResponse,
    IVerificationTokenService,
} from 'types/verificationToken';

class VerificationTokenService implements IVerificationTokenService {
    private prisma: PrismaClient;

    constructor(prisma: PrismaClient = prismaAdapter) {
        this.prisma = prisma;
    }

    async storeVerificationToken(
        userId: string,
        token: string
    ): Promise<IVerificationTokenResponse | null> {
        const tokenData = await this.prisma.verificationToken.create({
            data: {
                identifier: userId,
                token,
                expires: EMAIL_VERIFICATION_TOKEN_EXPIRATION_DATE,
            },
        });
        return tokenData;
    }

    async getByIdentifier(userId: string): Promise<IVerificationToken | null> {
        const token = await this.prisma.verificationToken.findFirst({
            where: {
                identifier: userId,
            },
        });
        return token;
    }

    validateToken(userToken: string, verificationToken: string): boolean {
        if (userToken && userToken != verificationToken) {
            return false;
        }

        return true;
    }

    isEmailVerificationTokenExpired(
        userTokenExpiration: number,
        verificationTokenExpiration: Date
    ) {
        const verificationTokenExpirationTimestamp =
            new Date(verificationTokenExpiration).getTime() / 1000;
        if (userTokenExpiration < verificationTokenExpirationTimestamp) {
            return true;
        }
        return false;
    }

    async removeVerificationToken(
        tokenId: string
    ): Promise<IVerificationToken[]> {
        const token: IVerificationToken[] =
            await this.prisma.verificationToken.delete({
                where: {
                    identifier: tokenId,
                },
            });
        console.log(token);
        return token;
    }
}

export default VerificationTokenService;
