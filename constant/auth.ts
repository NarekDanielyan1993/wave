export const AUTH_SESSION_OPTIONS = {
    refetchInterval: 5 * 60,
    refetchOnWindowFocus: true,
};

export const SESSION_STATUS = {
    AUTHENTICATED: 'authenticated',
    UNAUTHENTICATED: 'unauthenticated',
    LOADING: 'loading',
};

enum SESSION_STRATEGIES {
    DATABASE = 'database',
    JWT = 'jwt',
}

export enum SESSION_PROVIDERS {
    CREDENTIALS = 'credentials',
    GOOGLE = 'google',
}

export const AUTH_SESSION_OPTIONS_SERVER = {
    maxAge: 60 * 60 * 24 * 30, // 30 Days
    strategy: SESSION_STRATEGIES.JWT,
    updateAge: 24 * 60 * 60,
    jwt: true,
};

export const AUTH_ENCRYPTION_LENGTH = 12;
export const JWT_TOKEN_EXPIRATION_TIME = '10h';
export const EMAIL_VERIFICATION_TOKEN_EXPIRATION_DATE = new Date(
    Date.now() + 10 * 60 * 60 * 1000
);
