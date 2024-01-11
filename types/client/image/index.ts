import { ImageProps } from 'next/image';

export interface ImageTypes extends ImageProps {
    width?: number;
    height?: number;
    src: string;
}
