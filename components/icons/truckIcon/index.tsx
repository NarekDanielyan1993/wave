import * as React from 'react';

const TruckIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg
        fill="none"
        height="1em"
        stroke="black"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        viewBox="0 0 24 24"
        width="1em"
        {...props}
    >
        <path d="M1 3h15v13H1zM16 8h4l3 3v5h-7V8z" />
        <path d="M8 18.5 A2.5 2.5 0 0 1 5.5 21 A2.5 2.5 0 0 1 3 18.5 A2.5 2.5 0 0 1 8 18.5 z" />
        <path d="M21 18.5 A2.5 2.5 0 0 1 18.5 21 A2.5 2.5 0 0 1 16 18.5 A2.5 2.5 0 0 1 21 18.5 z" />
    </svg>
);

export default TruckIcon;
