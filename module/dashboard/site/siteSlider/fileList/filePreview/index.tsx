import { CloseIcon } from '@chakra-ui/icons';
import { Flex, Text } from '@chakra-ui/react';
import { FILE_UPLOAD_BASE_URL } from '@constant/file';
import {
    StyledFileSelectImageOverlay,
    StyledFileSelectImageRemove,
    StyledFileWrapper,
    StyledFileWrapperImage,
} from './style';

const AttachmentPreview = ({
    image,
    onRemove,
    index,
    onFullscreen,
    disableRemoveBtn = false,
}) => {
    const { name, url } = image;
    return (
        <Flex
            borderRadius="sm"
            boxShadow="md"
            flexDir="column"
            onClick={onFullscreen}
            overflow="hidden"
            pointerEvents={disableRemoveBtn ? 'none' : 'initial'}
            position="relative"
            userSelect="none"
            width="10rem"
        >
            <StyledFileWrapper
                cursor="pointer"
                pos="relative"
                role="presentation"
            >
                <StyledFileWrapperImage
                    alt=""
                    src={`${FILE_UPLOAD_BASE_URL}/${url}`}
                />
                <StyledFileSelectImageOverlay>
                    <StyledFileSelectImageRemove
                        onClick={e => {
                            e.stopPropagation();
                            onRemove(image, index);
                        }}
                    >
                        <CloseIcon />
                    </StyledFileSelectImageRemove>
                </StyledFileSelectImageOverlay>
            </StyledFileWrapper>
            <Text p={2}>{name}</Text>
        </Flex>
    );
};

export default AttachmentPreview;
