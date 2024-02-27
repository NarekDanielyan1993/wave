import { ArrowLeftIcon, ArrowRightIcon, CloseIcon } from '@chakra-ui/icons';
import Image from 'next/image';
import {
    StyledImageSliderBtn,
    StyledImageSliderWrapper,
    StyledImageSliderWrapperFullscreenImage,
} from './style';

const ImageSlider = ({
    filesCount,
    fileIndex,
    imageUrl,
    onNext,
    onPrev,
    onClose,
}: {
    filesCount: number;
    fileIndex: number;
    onNext: () => void;
    onPrev: () => void;
    onClose: () => void;
    imageUrl: string;
}) => (
    <StyledImageSliderWrapper>
        <StyledImageSliderWrapperFullscreenImage>
            <Image alt="" layout="fill" src={imageUrl} />
        </StyledImageSliderWrapperFullscreenImage>
        <StyledImageSliderBtn
            aria-label="close-fullscreen"
            fontSize="lg"
            icon={<CloseIcon />}
            onClick={onClose}
            right={10}
            top={10}
        />
        <StyledImageSliderBtn
            aria-label="next-image"
            display={filesCount === fileIndex ? 'none' : 'block'}
            fontSize="lg"
            icon={<ArrowRightIcon />}
            onClick={onNext}
            right="1vw"
            top="50%"
        />
        <StyledImageSliderBtn
            aria-label="prev-image"
            display={fileIndex === 0 ? 'none' : 'block'}
            fontSize="lg"
            icon={<ArrowLeftIcon />}
            left="1vw"
            onClick={onPrev}
            top="50%"
        />
    </StyledImageSliderWrapper>
);

export default ImageSlider;
