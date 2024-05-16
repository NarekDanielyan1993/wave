import { config } from '@utils/config';
import { generateEmailVerificationDefaultSubject } from '@utils/provider';
import { UserPermissionActionsTypes } from 'types';

export const MAIL_GEN_DEFAULT_PARAMETERS = {
    THEME: 'default',
    BUTTON: {
        color: '#1a73e8',
        text: 'Verify your account',
    },
    PRODUCT_PARAMETERS: {
        name: 'Wave company',
        link: config.NEXT_PUBLIC_BASE_URL,
    },
    SUBJECT: generateEmailVerificationDefaultSubject(),
};

export const USER_PERMISSIONS_DEFAULT: UserPermissionActionsTypes = {
    read: false,
    create: false,
    update: false,
    delete: false,
};

export const PRODUCT_CARDS_QUERY_DEFAULT_PARAMS = {
    limit: 3,
    order: 'desc',
    sortBy: 'createdAt',
} as const;
