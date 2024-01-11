type linkTypes = 'link' | 'button';
export type NavLinkTypes = {
    url: string;
    text: string;
    type: linkTypes;
    renderAs?: string;
    variant?: string;
    click?: () => void;
};
