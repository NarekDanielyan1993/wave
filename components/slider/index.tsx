import { Box } from '@chakra-ui/react';
import Carousel from '@components/carousel';
import ImageComponent from '@components/image';
import Promotion from '@components/promotion';
import useGeneratePromotion from '@hooks/useGenerateSliderPromotion';
import { useAppSelector } from '@store/create-store';
import { siteSelector } from '@store/site/selectors';
import { SliderPromotionTypes } from 'types';
import { StyledPromotionContainer } from './style';

const SliderComponent = () => {
    const sliderPromotions: SliderPromotionTypes[] = useGeneratePromotion();
    const { siteImages } = useAppSelector(siteSelector);
    return (
        <Box sx={{ w: '100%', h: '80vh', overflow: 'hidden' }}>
            <Carousel>
                {sliderPromotions.map((item, index) => (
                    <div
                        key={index}
                        style={{
                            position: 'relative',
                            width: '100%',
                            height: '80vh',
                        }}
                    >
                        <ImageComponent
                            alt=""
                            layout="fill"
                            objectFit="cover"
                            priority
                            src={siteImages[index]?.url}
                        />
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
        </Box>
    );
};

export default SliderComponent;
