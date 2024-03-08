import { UserRole } from '@prisma/client';
import 'next-auth';
import { User } from 'next-auth';
import 'next-auth/jwt';
declare module 'next-auth' {
    export interface User {
        role: UserRole;
        email: string;
        id: string;
        isProvider: boolean;
    }

    export interface Session extends DefaultSession {
        user: User;
    }
}
declare module 'next-auth/jwt' {
    interface JWT {
        user: User;
    }
}
