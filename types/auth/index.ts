import { UserRole } from 'types/user';

export interface IAuthRes {
    email: string;
    role: keyof UserRole;
}
