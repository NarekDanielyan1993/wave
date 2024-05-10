import { FILE_ERROR_TYPES } from 'constant';
import formidable from 'formidable';
import { IncomingMessage } from 'http';
import { FileError, isFileExceedsSizeLimit, isFileFormatAllowed } from 'utils';

class FormParser {
    private form;
    constructor() {
        this.form = formidable({
            keepExtensions: true,
            allowEmptyFiles: false,
            multiples: false,
        });
    }

    async parseForm(req: IncomingMessage) {
        try {
            const [fields, files] = await this.form.parse(req);
            const transformedFields = {} as formidable.Fields<string>;
            for (const key in fields) {
                if (fields.hasOwnProperty(key)) {
                    transformedFields[key] = fields[key][0];
                }
            }
            const file = files.file[0];

            if (file?.mimetype && !isFileFormatAllowed(file.mimetype)) {
                throw new FileError(
                    FILE_ERROR_TYPES.INVALID_FILE_TYPE.msg,
                    FILE_ERROR_TYPES.INVALID_FILE_TYPE.status
                );
            }

            if (file?.size && isFileExceedsSizeLimit(file.size)) {
                throw new FileError(
                    FILE_ERROR_TYPES.LIMIT_FILE_SIZE.msg,
                    FILE_ERROR_TYPES.LIMIT_FILE_SIZE.status
                );
            }
            return [transformedFields, file];
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
}

export default FormParser;
