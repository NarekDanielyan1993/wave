import * as React from 'react';

export default function GridOnIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="black"
            height="1em"
            width="1em"
            {...props}
        >
            <path d="M10 4v4h4V4h-4m6 0v4h4V4h-4m0 6v4h4v-4h-4m0 6v4h4v-4h-4m-2 4v-4h-4v4h4m-6 0v-4H4v4h4m0-6v-4H4v4h4m0-6V4H4v4h4m2 6h4v-4h-4v4M4 2h16a2 2 0 012 2v16a2 2 0 01-2 2H4c-1.08 0-2-.9-2-2V4a2 2 0 012-2z" />
        </svg>
    );
}
