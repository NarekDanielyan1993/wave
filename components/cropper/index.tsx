import {
    Button,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
} from '@chakra-ui/react';
import 'cropperjs/dist/cropper.css';
import { useRef } from 'react';
import { default as Cropper } from 'react-cropper';
import { IImageCropper } from 'types/client/imageCropper';

const ImageCropper = ({
    isOpen,
    onClose,
    src,
    width,
    height,
    initialAspectRatio,
    setCroppedImage,
    ...props
}: IImageCropper) => {
    const cropperRef = useRef<ReactCropper>(null);
    const onCrop = () => {
        const cropper = cropperRef.current?.cropper;
        setCroppedImage(cropper.getCroppedCanvas().toDataURL());
        onClose();
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Crop Image</ModalHeader>
                <ModalBody>
                    <Cropper
                        {...props}
                        initialAspectRatio={initialAspectRatio}
                        minCropBoxHeight={200}
                        minCropBoxWidth={200}
                        ref={cropperRef}
                        responsive={true}
                        src={src}
                        style={{ width, height }}
                    />
                </ModalBody>
                <ModalFooter display="flex" gap={4}>
                    <Button onClick={onClose} variant="primary">
                        Close
                    </Button>
                    <Button onClick={onCrop} variant="primary">
                        crop
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default ImageCropper;
