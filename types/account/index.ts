import { SESSION_PROVIDERS } from '@constant/auth';

export interface Account {
    userId: string;
    type: (typeof SESSION_PROVIDERS)[keyof typeof SESSION_PROVIDERS];
    provider: (typeof SESSION_PROVIDERS)[keyof typeof SESSION_PROVIDERS];
    providerAccountId: string;
    refresh_token?: string;
    access_token?: string;
    expires_at?: number;
    token_type?: string;
    scope?: string;
    id_token?: string;
    session_state?: string;
}

export interface IAccountService {
    createAccount: (account: Account) => Promise<void>;
}
