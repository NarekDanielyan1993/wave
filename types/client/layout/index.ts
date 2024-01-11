export type LayoutTypes = {
    children: React.ReactNode;
};

export type DashboardLayoutTypes = {
    rightSideTitle: string;
} & LayoutTypes;

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
