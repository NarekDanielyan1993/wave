import FormParser from '@lib/formParser';
import CloudinaryService from '@lib/upload';
import { handleError } from '@utils/error-handler';
import { IncomingMessage } from 'http';
import { NextApiResponse } from 'next';

export const fileUploadMiddleware = async (
    req: IncomingMessage,
    res: NextApiResponse,
    next: any
) => {
    try {
        const formParser = new FormParser();
        const [fields, file] = await formParser.parseForm(req);
        if (file) {
            const base64 = Buffer.from(file.filepath as string).toString(
                'utf8'
            );
            const cloudinaryService = new CloudinaryService();
            const fileUploaded = await cloudinaryService.uploadFile(base64);
            req.file = fileUploaded || null;
        }
        req.body = fields;
        await next();
    } catch (error) {
        handleError(error, res);
    }
};
