import { GetPaginatedProductsActionPayload } from '../store';

export type DashboardLayoutType = {
    children: React.ReactNode;
};

export type ShopLayoutType = {
    children: React.ReactNode;
    filterProducts: (data: GetPaginatedProductsActionPayload) => void;
};

// FOOTER

export type businessIconDetailTypes =
    | 'address'
    | 'phone'
    | 'email'
    | 'business';

export type BusinessDetailTypes = {
    iconName: businessIconDetailTypes;
    label: string;
    text: string;
};
