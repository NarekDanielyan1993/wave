export interface IVerificationToken {
    id: string;
    identifier: string;
    token: string;
    expires: Date;
}

export interface IVerificationTokenResponse extends IVerificationToken {
    expires: Date;
}

export interface IVerificationTokenService {
    isEmailVerificationTokenExpired(
        userTokenExpiration: number,
        verificationTokenExpiration: Date
    ): boolean;
    getByIdentifier(userId: string): Promise<IVerificationToken | null>;
    validateToken(userToken: string, verificationToken: string): boolean;
    storeVerificationToken: (
        userId: string,
        token: string
    ) => Promise<IVerificationTokenResponse | null>;
    removeVerificationToken: (
        tokenId: string
    ) => Promise<IVerificationTokenResponse[] | null>;
}
