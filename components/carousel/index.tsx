import { ArrowLeftIcon, ArrowRightIcon } from '@chakra-ui/icons';
import React, { useEffect, useRef, useState } from 'react';
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
    const swiperRef = useRef<HTMLDivElement>(null);
    const currentRef = useRef<number>(0);
    const [current, setCurrent] = useState<number>(0);

    const prev = () => {
        if (swiperRef.current && swiperRef.current.children.length > 0) {
            currentRef.current =
                currentRef.current === 0
                    ? children.length - 1
                    : currentRef.current - 1;
            swiperRef.current.children[currentRef.current].scrollIntoView({
                behavior: 'smooth',
                block: 'nearest',
                inline: 'start',
            });
        }
    };

    const indicatorHandler = (index: number) => {
        swiperRef.current.children[index].scrollIntoView({
            behavior: 'smooth',
            block: 'nearest',
            inline: 'start',
        });
        setCurrent(index);
    };

    const next = () => {
        if (swiperRef.current && swiperRef.current.children.length > 0) {
            currentRef.current =
                currentRef.current === children.length - 1
                    ? 0
                    : currentRef.current + 1;
            swiperRef.current.children[currentRef.current].scrollIntoView({
                behavior: 'smooth',
                block: 'nearest',
                inline: 'start',
            });
        }
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
                ref={swiperRef}
                sx={{
                    '& > *': {
                        position: 'relative',
                        flexShrink: 0,
                        scrollSnapStop: withTouch ? 'always' : '',
                        scrollSnapAlign: withTouch ? 'start' : '',
                        width: '100%',
                        height: '100%',
                    },
                    display: 'flex',
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
                                opacity: current === i ? 1 : 0.7,
                            }}
                        />
                    ))}
                </Indicators>
            ) : null}
        </CarouselContainer>
    );
};

export default Carousel;
