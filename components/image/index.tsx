import { FILE_UPLOAD_BASE_URL } from '@constant/file';
import Image, { ImageProps } from 'next/image';
const ImageComponent = ({ src, ...props }: ImageProps) => (
    <Image
        alt=""
        src={src ? `${FILE_UPLOAD_BASE_URL}/${src}` : ''}
        {...props}
    />
);

export default ImageComponent;
