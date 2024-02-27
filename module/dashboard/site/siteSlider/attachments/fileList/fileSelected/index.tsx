import { CloseIcon } from '@chakra-ui/icons';
import { Flex, Text } from '@chakra-ui/react';
import { IAttachmentPreview } from 'src/types';
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
}: IAttachmentPreview) => {
    const { name } = image;
    return (
        <Flex
            borderRadius="sm"
            boxShadow="md"
            flexDir="column"
            onClick={onFullscreen}
            overflow="hidden"
            position="relative"
            width="32"
        >
            <StyledFileWrapper
                cursor="pointer"
                pos="relative"
                role="presentation"
            >
                <StyledFileWrapperImage alt="" src={image} />
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
