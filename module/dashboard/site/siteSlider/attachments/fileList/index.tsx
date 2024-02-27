import { Flex } from '@chakra-ui/react';
import { useState } from 'react';
import ImageSlider from 'src/component/imageSlider';
import { IAttachmentPreviewList } from 'src/types';
import { generateFileUrl, isExists } from 'src/utills/helper';
import AttachmentPreview from './fileSelected';

const AttachmentList = ({
    images,
    register,
    onRemove,
}: IAttachmentPreviewList) => {
    const [openInFullscreen, setOpenInFullscreen] = useState<number | null>(
        null
    );

    const showNextImageHandler = () => {
        if (
            !isExists(openInFullscreen) ||
            openInFullscreen === images.length - 1
        ) {
            return;
        }
        setOpenInFullscreen((prev) => (prev as number) + 1);
    };

    const showPrevImageHandler = () => {
        if (!openInFullscreen || openInFullscreen === 0) return;
        setOpenInFullscreen((prev) => (prev as number) - 1);
    };

    return (
        <Flex flexWrap="wrap" gap={6} mt={1}>
            {images.map((image, index) => {
                return (
                    <AttachmentPreview
                        image={image}
                        index={index}
                        key={image.id}
                        onFullscreen={() => setOpenInFullscreen(index)}
                        onRemove={onRemove}
                        register={register}
                    />
                );
            })}
            {isExists(openInFullscreen) ? (
                <ImageSlider
                    fileIndex={openInFullscreen}
                    filesCount={images.length - 1}
                    imageUrl={generateFileUrl(images[openInFullscreen])}
                    onClose={() => setOpenInFullscreen(null)}
                    onNext={showNextImageHandler}
                    onPrev={showPrevImageHandler}
                />
            ) : null}
        </Flex>
    );
}s

export default AttachmentList;
