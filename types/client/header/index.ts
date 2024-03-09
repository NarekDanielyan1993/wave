import React from 'react';

type linkTypes = 'link' | 'button';
export type NavLinkTypes = {
    url: string;
    text: string | React.ReactElement;
    type: linkTypes;
    click?: () => void;
};
