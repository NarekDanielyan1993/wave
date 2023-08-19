import { IAuthRes } from 'types/auth';

declare module 'next-auth' {
    interface Session {
        expires: string;
        user: IAuthRes;
    }
}
