import { ArrowLeftIcon, ArrowRightIcon } from '@chakra-ui/icons';
import React, { useEffect, useState } from 'react';
import Indicators from './Indicators';
import Indicator from './Indicators/indicator';
import CarouselBtn from './carouselBtn';
import { CarouselContainer, CarouselWrapper } from './style';

const Carousel = ({
    children,
    withControls = false,
    withIndicators = false,
    withTouch = false,
    autoSlide = false,
    delay = 3000,
}: {
    autoSlide?: boolean;
    delay?: number;
    withTouch?: boolean;
    withControls?: boolean;
    withIndicators?: boolean;
    children: React.ReactNode[];
}) => {
    const [current, setCurrent] = useState<number>(0);

    const prev = () => {
        setCurrent(prev => (prev === 0 ? children.length - 1 : prev - 1));
    };

    const next = () => {
        setCurrent(prev => (prev === children.length - 1 ? 0 : prev + 1));
    };

    const indicatorHandler = (index: number) => {
        setCurrent(index);
    };

    useEffect(() => {
        if (!autoSlide) {
            return;
        }
        const id = setInterval(next, delay);
        return () => clearInterval(id);
    }, []);

    return (
        <CarouselContainer>
            <CarouselWrapper
                sx={{
                    '& > *': {
                        position: 'relative',
                        flexShrink: 0,
                        scrollSnapStop: withTouch ? 'always' : '',
                        scrollSnapAlign: withTouch ? 'start' : '',
                        transform: `translateX(-${current * 100}%)`,
                        transition: '0.6s transform ease-out',
                        width: 'full',
                        height: 'full',
                    },
                    overflowX: 'auto',
                    scrollSnapType: withTouch ? 'x mandatory' : 'none',
                }}
            >
                {children}
            </CarouselWrapper>
            {withControls ? (
                <>
                    <CarouselBtn
                        icon={<ArrowRightIcon />}
                        onClick={next}
                        right="1rem"
                    />
                    <CarouselBtn
                        icon={<ArrowLeftIcon />}
                        left="1rem"
                        onClick={prev}
                    />
                </>
            ) : null}
            {withIndicators ? (
                <Indicators>
                    {children.map((_, i) => (
                        <Indicator
                            onClick={() => indicatorHandler(i)}
                            key={i}
                            style={{
                                opacity: current === i ? 1 : 0.5,
                            }}
                        />
                    ))}
                </Indicators>
            ) : null}
        </CarouselContainer>
    );
};

export default Carousel;
