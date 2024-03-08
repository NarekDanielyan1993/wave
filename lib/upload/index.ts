import { UploadApiResponse, v2 as cloudinary } from 'cloudinary';
import { config as conf } from '..';

class CloudinaryService {
    constructor() {
        cloudinary.config({
            cloud_name: conf.CLOUDINARY_CLOUD_NAME,
            api_key: conf.CLOUDINARY_API_KEY,
            api_secret: conf.CLOUDINARY_API_SECRET,
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
            console.log(err);
            throw new Error('Error happened while creating file.');
        }
    }

    async deleteFile(publicId: string) {
        try {
            await cloudinary.uploader.destroy(publicId);
        } catch (err) {
            throw new Error('Error happened while deleting files.');
        }
    }
}

export const config = { api: { bodyParser: { sizeLimit: '4mb' } } };

export default CloudinaryService;
