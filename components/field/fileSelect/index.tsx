import { Box, Button, Text } from '@chakra-ui/react';
import { ALLOWED_FILE_TYPES, FILE_UPLOAD_BASE_URL } from '@constant/file';
import { useAppDispatch } from '@store/create-store';
import { deleteImage } from '@store/products/action';
import {
    isFileExceedsSizeLimit,
    isFileFormatAllowed,
    readFile,
} from '@utils/helper';
import Image from 'next/image';
import { useRef, type ChangeEvent } from 'react';

const FileSelect = ({
    onChange,
    value,
}: {
    onChange: (event: string) => void;
}) => {
    console.log(value);
    const imageUploader = useRef<HTMLInputElement>(null);
    const dispatch = useAppDispatch();
    const fileDeleteHandler = () => {
        dispatch(
            deleteImage({
                id: value.id,
                publicId: value.publicId,
                productId: value.productId,
            })
        );
        onChange('');
    };
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
            try {
                const fileData = await readFile(file);
                onChange({ name: file.name, url: fileData });
            } catch (error) {
                console.error(error);
            }
        }
    };

    return (
        <>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDir: 'column',
                    width: '50%',
                    height: 'auto',
                    aspectRatio: 1,
                    margin: '0 auto',
                    position: 'relative',
                    mb: 6,
                    borderRadius: 'sm',
                    boxShadow: 'md',
                }}
            >
                {(value?.publicId || value?.url) && (
                    <Box height="full" pos="relative" w="full">
                        <Image
                            alt=""
                            layout="fill"
                            priority
                            src={
                                value?.publicId
                                    ? `${FILE_UPLOAD_BASE_URL}/${value.url}`
                                    : value?.url
                            }
                        />
                    </Box>
                )}
                <Text py={2}>{value?.name}</Text>
                {!value?.publicId && !value?.url && <Text>No Image</Text>}
            </Box>
            <input
                accept={ALLOWED_FILE_TYPES.join(',')}
                hidden
                onChange={fileUploadHandler}
                ref={imageUploader}
                type="file"
            />
            <Box
                style={{
                    display: 'flex',
                    gap: 6,
                    justifyContent: 'center',
                    marginBottom: 10,
                }}
            >
                <Button
                    isDisabled={!!value}
                    onClick={() => imageUploader?.current?.click()}
                    variant="primary"
                >
                    upload
                </Button>
                {value?.publicId ? (
                    <Button
                        isDisabled={!value}
                        onClick={fileDeleteHandler}
                        variant="primary"
                    >
                        delete
                    </Button>
                ) : (
                    <Button
                        isDisabled={!value}
                        onClick={() => onChange('')}
                        variant="primary"
                    >
                        cancel
                    </Button>
                )}
            </Box>
        </>
    );
};

export default FileSelect;
