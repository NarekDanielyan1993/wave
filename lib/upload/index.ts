import { UploadApiResponse, v2 as cloudinary } from 'cloudinary';
import { config } from '..';

class CloudinaryService {
    constructor() {
        cloudinary.config({
            cloud_name: config.CLOUDINARY_CLOUD_NAME,
            api_key: config.CLOUDINARY_API_KEY,
            api_secret: config.CLOUDINARY_API_SECRET,
        });
    }

    async uploadFile(url: string) {
        try {
            const result: UploadApiResponse = await cloudinary.uploader.upload(
                url
            );
            return {
                url: `v${result.version}/${result.public_id}.${result.format}`,
                publicId: result.public_id,
            };
        } catch (err) {
            throw new Error('Error happened while creating file.');
        }
    }

    async deleteFile(publicId: string) {
        try {
            await cloudinary.uploader.destroy(publicId);
        } catch (err) {
            throw new Error('Error happened while deleteing files.');
        }
    }
}

export default CloudinaryService;
