import ImageComponent from '@components/image';
import Promotion from '@components/promotion';
import useGeneratePromotion from '@hooks/useGenerateSliderPromotion';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { SliderPromotionTypes } from 'types';
import { StyledPromotionContainer } from './style';
const SliderComponent = () => {
    const settings = {
        emulateTouch: true,
        showArrows: false,
        showThumbs: false,
        showIndicators: false,
        showStatus: false,
    };
    const sliderPromotions: SliderPromotionTypes[] = useGeneratePromotion();
    return (
        <Carousel dynamicHeight {...settings}>
            {sliderPromotions.map((item, index) => (
                <div
                    key={index}
                    style={{
                        position: 'relative',
                        height: '100dvh',
                    }}
                >
                    <ImageComponent layout="fill" src={item.imageUrl} />
                    <StyledPromotionContainer>
                        <Promotion
                            lineOneText={item.lineOneText}
                            lineTwoText={item.lineTwoText}
                            linkText={item.linkText}
                            linkTo={item.linkTo}
                        />
                    </StyledPromotionContainer>
                </div>
            ))}
        </Carousel>
    );
};

export default SliderComponent;
