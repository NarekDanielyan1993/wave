import React, { Children } from 'react';
import 'swiper/css';
import 'swiper/css/autoplay';
import { Autoplay } from 'swiper/modules';
import { Swiper, SwiperProps, SwiperSlide } from 'swiper/react';

const Carousel = ({
    children,
    ...props
}: {
    children: React.ReactNode[];
} & SwiperProps) => (
    <Swiper modules={[Autoplay]} {...props}>
        {Children.map(children, (child, i) => (
            <SwiperSlide key={i}>{child}</SwiperSlide>
        ))}
    </Swiper>
);

export default Carousel;
