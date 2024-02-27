import React from 'react';
import { StyledCarouselBtn } from './style';

const CarouselBtn = ({
    icon,
    left,
    right,
    onClick,
}: {
    onClick: () => void;
    right?: string;
    left?: string;
    icon: React.ReactElement;
}) => (
    <StyledCarouselBtn
        aria-label=""
        icon={icon}
        left={left}
        onClick={onClick}
        right={right}
    />
);

export default CarouselBtn;
