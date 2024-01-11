import { UserRole } from '@prisma/client';
import 'next-auth';
import { DefaultSession, User } from 'next-auth';
import 'next-auth/jwt';
declare module 'next-auth' {
    interface User {
        role: UserRole;
        email: string;
        id: string;
    }
    interface Session extends DefaultSession {
        user: User;
    }
}
declare module 'next-auth/jwt' {
    interface JWT {
        user: User;
    }
}
