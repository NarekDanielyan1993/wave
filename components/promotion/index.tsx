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
        <StyledSliderLineOne fontSize={{ base: 'xl', md: '6xl' }}>
            {lineOneText}
        </StyledSliderLineOne>
        <StyledSliderLineTwo fontSize={{ base: 'xl', md: '3xl' }}>
            {lineTwoText}
        </StyledSliderLineTwo>
        <Link href={linkTo} variant="primary">
            {linkText}
        </Link>
    </>
);

export default Promotion;
