export type LayoutTypes = {
    children: React.ReactNode;
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
