import React, { Children } from 'react';
import 'swiper/css';
import 'swiper/css/autoplay';
import { Autoplay } from 'swiper/modules';
import { Swiper, SwiperProps, SwiperSlide } from 'swiper/react';
// import Indicators from './Indicators';
// import Indicator from './Indicators/indicator';
// import CarouselBtn from './carouselBtn';
// import { CarouselContainer, CarouselWrapper } from './style';

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
} & SwiperProps) => {
    // const [current, setCurrent] = useState<number>(0);
    // const currentRef = useRef<number>(0);
    // const isMoveStart = useRef(false);
    // const [isMoveStart, setIsMoveStart] = useState(false);
    // const [startX, setStartX] = useState(0);
    // const deltaXRef = useRef<number>(0);
    // const intervalIdRef = useRef(0);
    // const deltaxInPercentageRef = useRef<number>(0);
    // const carouselRef = useRef<HTMLDivElement>(null);
    // const prev = () => {
    // setCurrent(prev => (prev === 0 ? children.length - 1 : prev - 1));
    //     currentRef.current =
    //         currentRef.current === 0
    //             ? children.length - 1
    //             : currentRef.current - 1;
    // };
    // console.log(currentRef.current);

    // const next = () => {
    //     console.log(children.length);
    //     carouselRef.current.children[
    //         currentRef.current
    //     ].style.transform = `translateX(-${currentRef.current * 100}%)`;
    //     currentRef.current =
    //         currentRef.current === children.length - 1
    //             ? 0
    //             : currentRef.current + 1;
    //     console.log(currentRef.current);

    // setCurrent(prev => (prev === children.length - 1 ? 0 : prev + 1));
    // console.log(current);
    // };

    // const indicatorHandler = (index: number) => {
    //     // setCurrent(index);
    // };

    // useEffect(() => {
    //     if (!autoSlide) {
    //         return;
    //     }
    //     intervalIdRef.current = setInterval(next, delay);
    //     return () => clearInterval(intervalIdRef.current);
    // }, [isMoveStart]);

    // useEffect(() => {
    //     if (isMoveStart) {
    //         setIsMoveStart(false);
    //         console.log(45454);
    //         clearInterval(intervalIdRef.current);
    //         intervalIdRef.current = setInterval(next, delay);
    //         return;
    //     }
    // }, [isMoveStart]);

    // const onPointerDownHandler = (e: TouchEvent) => {
    //     console.log(e.touches[0]?.clientX);
    //     setStartX(e.touches[0]?.clientX);
    //     // setIsMoveStart(true);
    // };

    // const onPointerUpHandler = () => {
    // isMoveStart.current = false;
    // setIsMoveStart(true);
    // console.log(deltaXRef.current);
    // if (deltaXRef.current > 0) {
    //     next();
    //     console.log(currentRef.current);
    // carouselRef.current.children[
    //     current
    // ].style.transform = `translateX(${current + 1 * -100}%)`;
    // carouselRef?.current?.children[current + 1].scrollIntoView();
    //     } else {
    //         prev();
    //     }
    // };

    // const onPointerMoveHandler = (e: TouchEvent) => {
    //     console.log(e.touches);
    //     if (!isMoveStart && !carouselRef.current && !(e.touches.length !== 1))
    //         return;
    //     e.preventDefault();
    // const { width } = carouselRef.current?.getBoundingClientRect();
    // console.log(e.touches[0]?.screenX);
    // console.log(isMoveStart);
    // console.log(carouselRef.current.scrollLeft);
    // console.log(startX);
    // console.log(startX - e.clientX);
    // const x = e.clientX - carouselRef.current.offsetLeft;
    // const walk = startX - x;
    // const deltaX = startX - e.touches[0]?.clientX;
    // deltaXRef.current = deltaX;
    // deltaxInPercentageRef.current = (deltaX / width) * 100;
    // console.log(deltaxInPercentageRef.current);
    // console.log(deltaX);
    // carouselRef.current.scrollLeft += width - startX - deltaX;
    // };

    return (
        // <CarouselContainer>
        //     <CarouselWrapper
        //         ref={carouselRef}
        //         onTouchStart={onPointerDownHandler}
        //         onTouchEnd={onPointerUpHandler}
        //         onTouchMove={onPointerMoveHandler}
        //         sx={{
        //             '& > *': {
        //                 position: 'relative',
        //                 flexShrink: 0,
        //                 // scrollSnapStop: withTouch ? 'always' : '',
        //                 // scrollSnapAlign: withTouch ? 'start' : '',
        //                 // transform: `translateX(-${current * 100}%)`,
        //                 transition: '0.6s all ease-out',
        //                 width: 'full',
        //                 height: 'full',
        //             },
        //             overflowX: 'auto',
        //             // scrollSnapType: withTouch ? 'x mandatory' : 'none',
        //         }}
        //     >
        //         {Children.map(children, (child, i) => {
        //             <SwiperSlide>{child}</SwiperSlide>;
        //         })}
        //     </CarouselWrapper>
        //     {withControls ? (
        //         <>
        //             <CarouselBtn
        //                 icon={<ArrowRightIcon />}
        //                 onClick={next}
        //                 right="1rem"
        //             />
        //             <CarouselBtn
        //                 icon={<ArrowLeftIcon />}
        //                 left="1rem"
        //                 onClick={prev}
        //             />
        //         </>
        //     ) : null}
        //     {withIndicators ? (
        //         <Indicators>
        //             {children.map((_, i) => (
        //                 <Indicator
        //                     onClick={() => indicatorHandler(i)}
        //                     key={i}
        //                     style={
        //                         {
        //                             // opacity: current === i ? 1 : 0.5,
        //                         }
        //                     }
        //                 />
        //             ))}
        //         </Indicators>
        //     ) : null}
        // </CarouselContainer>
        <Swiper
            modules={[Autoplay]}
            slidesPerView={1}
            autoplay={{ delay: 5000 }}
            shortSwipes={false}
            speed={1000}
            allowTouchMove
        >
            {Children.map(children, (child, i) => {
                return <SwiperSlide>{child}</SwiperSlide>;
            })}
        </Swiper>
    );
};

export default Carousel;
