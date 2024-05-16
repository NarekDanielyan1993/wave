import { FILE_UPLOAD_BASE_URL } from '@constant/file';
import { IMAGE_ROUTES } from '@constant/route';
import Image, { ImageProps } from 'next/image';

const ImageComponent = ({ src, alt, ...props }: ImageProps) => (
    <Image
        alt={alt}
        src={
            src
                ? `${FILE_UPLOAD_BASE_URL}/${src}`
                : IMAGE_ROUTES.IMAGE_NOT_AVAILABLE
        }
        {...props}
    />
);

export default ImageComponent;
