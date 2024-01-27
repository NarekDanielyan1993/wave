import { config } from '@utils/config';
export const EMAIL_VERIFICATION_URL = `${config.BASE_URL}/api/user/profile/verifyEmail`;

export const PRODUCTS_API = {
    GET_PRODUCTS: '/api/product',
    GET_PRODUCT: '/api/product',
    GET_PAGINATED_PRODUCTS: '/api/product/pagination',
    DELETE_PRODUCT: '/api/product',
    EDIT_PRODUCT: '/api/product',
    ADD_PRODUCT: '/api/product',
};

export const BRAND_API = {
    GET_BRANDS: '/api/brand',
};

export const AUTH_API = {
    SIGN_UP: '/api/auth/signup',
    SIGN_IN: '/api/auth/callback/credentials',
};

export const USER_API = {
    GET_USER: '/api/user/profile',
    ADD_TO_CART: '/api/user/profile/cart',
    ADD_TO_HISTORY: '/api/user/profile/history',
    GET_CARTS: '/api/user/profile/cart',
    GET_HISTORY: '/api/user/profile/history',
    REMOVE_CART: '/api/user/profile/cart',
    UPDATE_USER: '/api/user/profile',
    UPDATE_USER_EMAIL: '/api/user/profile/email',
};

export const SITE_API = {
    GET_SITE: '/api/site',
    UPDATE_SITE: '/api/site',
    CREATE_SITE: '/api/site',
};

export const USER_PERMISSIONS_API = {
    GET_USER_PERMISSIONS: '/api/userPermissions',
};

export const PAYMENT_API = {
    payment: '/api/payment',
    SIGN_IN: '/api/auth/callback/credentials',
};
