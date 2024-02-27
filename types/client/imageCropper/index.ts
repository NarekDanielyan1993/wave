export interface IImageCropper extends Cropper.Options<HTMLImageElement> {
    isOpen: boolean;
    onClose: () => void;
    width: number | string;
    height: number | string;
    src: string;
    setCroppedImage: (image: string) => void;
}
