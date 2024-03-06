type linkTypes = 'link' | 'button';
export type NavLinkTypes = {
    url: string;
    text: string;
    type: linkTypes;
    click?: () => void;
};
