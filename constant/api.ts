import { config } from '@utils/config';
export const EMAIL_VERIFICATION_URL = `${config.NEXT_PUBLIC_BASE_URL}/api/user/profile/verifyEmail`;
export const EMAIL_CHANGE_URL = `${config.NEXT_PUBLIC_BASE_URL}/api/user/profile/emailConfirmation`;

export const PRODUCTS_API = {
    GET_PRODUCTS: '/api/product',
    GET_PRODUCT: '/api/product',
    GET_PAGINATED_PRODUCTS: '/api/product/pagination',
    DELETE_PRODUCT: '/api/product',
    DELETE_PRODUCT_IMAGE: '/api/product/image',
    EDIT_PRODUCT: '/api/product',
    ADD_PRODUCT: '/api/product',
};

export const FRETS_API = {
    GET_PAGINATED_FRETS: '/api/fret/pagination',
    DELETE_FRETS: '/api/fret',
    EDIT_FRETS: '/api/fret',
    ADD_FRETS: '/api/fret',
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
    ADD_PROFILE_IMAGE: '/api/user/profile',
    DELETE_PROFILE_IMAGE: '/api/user/profile/image',
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
    UPLOAD_SITE_IMAGE: 'api/site/image',
    DELETE_SITE_IMAGE: 'api/site/image',
    GET_SITE_IMAGE: 'api/site/image',
    CREATE_SITE: '/api/site',
};

export const USER_PERMISSIONS_API = {
    GET_USER_PERMISSIONS: '/api/userPermissions',
};

export const PAYMENT_API = {
    payment: '/api/payment',
    SIGN_IN: '/api/auth/callback/credentials',
};
