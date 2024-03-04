import { FILE_UPLOAD_BASE_URL } from '@constant/file';
import { SLIM_PROMOTION } from '@constant/promotion';
import { useAppSelector } from '@store/create-store';
import { siteImagesSelector } from '@store/site/selectors';
import { SlimPromotionTypes } from 'types';
import Promotion from '..';
import { StyledSlimPromotion, StyledSlimPromotionContainer } from './style';

const SlimPromotion = () => {
    const slimPromotion: SlimPromotionTypes = SLIM_PROMOTION;
    const siteImages = useAppSelector(siteImagesSelector);
    return (
        <StyledSlimPromotion
            style={{
                background: `url(${FILE_UPLOAD_BASE_URL}/${siteImages.at(-1)
                    ?.url})`,
            }}
        >
            <StyledSlimPromotionContainer>
                <Promotion
                    lineOneText={slimPromotion.lineOneText}
                    lineTwoText={slimPromotion.lineTwoText}
                    linkText={slimPromotion.linkText}
                    linkTo={slimPromotion.linkTo}
                />
            </StyledSlimPromotionContainer>
        </StyledSlimPromotion>
    );
};

export default SlimPromotion;
