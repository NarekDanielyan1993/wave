import { ALLOWED_FILE_TYPES } from '@constant/file';
import { axiosInstance } from '@utils/apiRequest';
import { config } from '@utils/config';
import { isFileExceedsSizeLimit, isFileFormatAllowed } from '@utils/helper';
import { type ChangeEvent } from 'react';
import { StyledFileInput } from '../style';

const FileSelect = ({
    onChange,
}: {
    onChange: (event: ProgressEvent<FileReader>) => void;
}) => {

    const fileUploadHandler = async (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            const file = e.target.files[0];
            if (!file) {
                return;
            }
            if (isFileExceedsSizeLimit(file)) {
                return;
            }
            if (!isFileFormatAllowed(file)) {
                return;
            }
            const readData = (f: File) =>
                new Promise(resolve => {
                    const reader = new FileReader();
                    reader.onloadend = () => resolve(reader.result);
                    reader.readAsDataURL(f);
                });
            const data = await readData(file);
            try {
                const response = await axiosInstance(
                    'post',
                    `${config.NEXT_PUBLIC_CLOUDINARY_URL}/${config.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/auto/upload`,
                    {
                        file: data,
                        upload_preset:
                            config.NEXT_PUBLIC_CLOUDINARY_PRESET_NAME,
                    }
                );
                console.log(response);
                onChange(response.data.secure_url);
            } catch (error) {
                console.error(error);
            }
        }
    };

    return (
        <StyledFileInput
            accept={ALLOWED_FILE_TYPES.join(',')}
            mb={2}
            onChange={fileUploadHandler}
            type="file"
        />
    );
};

export default FileSelect;
