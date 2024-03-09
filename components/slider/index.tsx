import { Box } from '@chakra-ui/react';
import Carousel from '@components/carousel';
import Promotion from '@components/promotion';
import { FILE_UPLOAD_BASE_URL } from '@constant/file';
import useGeneratePromotion from '@hooks/useGenerateSliderPromotion';
import { useAppSelector } from '@store/create-store';
import { siteSelector } from '@store/site/selectors';
import Image from 'next/image';
import { SliderPromotionTypes } from 'types';
import { StyledPromotionContainer } from './style';

const SliderComponent = () => {
    const sliderPromotions: SliderPromotionTypes[] = useGeneratePromotion();
    const { siteImages } = useAppSelector(siteSelector);
    return (
        <Box sx={{ w: '100%', h: '80vh', overflow: 'hidden' }}>
            <Carousel
                allowTouchMove
                autoplay={{ delay: 5000 }}
                slidesPerView={1}
                speed={1000}
            >
                {sliderPromotions.map((item, index) => (
                    <div
                        key={index}
                        style={{
                            position: 'relative',
                            width: '100%',
                            height: '80vh',
                        }}
                    >
                        <Image
                            alt=""
                            layout="fill"
                            objectFit="cover"
                            priority
                            src={`${FILE_UPLOAD_BASE_URL}/${siteImages[index]?.url}`}
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
