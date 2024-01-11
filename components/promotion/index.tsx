import Link from '@components/button/link';
import { PromotionTypes } from 'types';
import { StyledSliderLineOne, StyledSliderLineTwo } from './style';

const Promotion = ({
    lineOneText,
    lineTwoText,
    linkText,
    linkTo,
}: PromotionTypes) => (
    <>
        <StyledSliderLineOne>{lineOneText}</StyledSliderLineOne>
        <StyledSliderLineTwo>{lineTwoText}</StyledSliderLineTwo>
        <Link href={linkTo} variant="primary">
            {linkText}
        </Link>
    </>
);

export default Promotion;
