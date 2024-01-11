import { SLIM_PROMOTION } from '@constant/promotion';
import { SlimPromotionTypes } from 'types';
import Promotion from '..';
import { StyledSlimPromotion, StyledSlimPromotionContainer } from './style';

const SlimPromotion = () => {
    const slimPromotion: SlimPromotionTypes = SLIM_PROMOTION;
    return (
        <StyledSlimPromotion
            style={{
                background: `url(${slimPromotion.imageUrl})`,
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
