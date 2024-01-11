import { ALLOWED_FILE_TYPES } from '@constant/file';
import { isFileExceedsSizeLimit, isFileFormatAllowed } from '@utils/helper';
import { type ChangeEvent } from 'react';
import { StyledFileInput } from '../style';

const FileSelect = ({
    onChange,
}: {
    onChange: (event: ProgressEvent<FileReader>) => void;
}) => {
    // const [image, setImage] = useState<File | undefined>(undefined);

    const fileUploadHandler = (e: ChangeEvent<HTMLInputElement>) => {
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
            // setImage(file);
            const reader = new FileReader();
            reader.onload = (event: ProgressEvent<FileReader>) => {
                if (event.target?.result) {
                    onChange(event);
                }
            };
            if (file) {
                reader.readAsDataURL(file);
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
