import { Flex } from '@chakra-ui/react';
import ImageSlider from '@components/imageSlider';
import { FILE_UPLOAD_BASE_URL } from '@constant/file';
import { useAppSelector } from '@store/create-store';
import { siteSelector } from '@store/site/selectors';
import { useState } from 'react';
import AttachmentPreview from './filePreview';

const AttachmentList = ({ onRemove }) => {
    const { siteImages, isSiteLoading } = useAppSelector(siteSelector);
    const [openInFullscreen, setOpenInFullscreen] = useState<number | null>(
        null
    );

    const showNextImageHandler = () => {
        if (openInFullscreen === siteImages.length - 1) {
            return;
        }
        setOpenInFullscreen(prev => (prev as number) + 1);
    };

    const showPrevImageHandler = () => {
        if (openInFullscreen === 0) {
            return;
        }
        setOpenInFullscreen(prev => (prev as number) - 1);
    };

    return (
        <Flex flexWrap="wrap" gap={6} mt={1}>
            {siteImages.map((image, index) => (
                <AttachmentPreview
                    disableRemoveBtn={isSiteLoading}
                    image={image}
                    index={index}
                    key={image.id}
                    onFullscreen={() => setOpenInFullscreen(index)}
                    onRemove={onRemove}
                />
            ))}
            {openInFullscreen || openInFullscreen === 0 ? (
                <ImageSlider
                    fileIndex={openInFullscreen}
                    filesCount={siteImages.length - 1}
                    imageUrl={`${FILE_UPLOAD_BASE_URL}/${siteImages[openInFullscreen]?.url}`}
                    onClose={() => setOpenInFullscreen(null)}
                    onNext={showNextImageHandler}
                    onPrev={showPrevImageHandler}
                />
            ) : null}
        </Flex>
    );
};

export default AttachmentList;
