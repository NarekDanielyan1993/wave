import { Box, Button, Text } from '@chakra-ui/react';
import ImageCropper from '@components/cropper';
import { FILE_ERROR_TYPES } from '@constant/error';
import { ALLOWED_FILE_TYPES, FILE_UPLOAD_BASE_URL } from '@constant/file';
import { useAppDispatch, useAppSelector } from '@store/create-store';
import { showNotification } from '@store/notification/notificationReducer';
import { addProfileImage, deleteProfileImage } from '@store/user/action';
import { userSelector, usersSelector } from '@store/user/selectors';
import { dataUrlToFile, isFileFormatAllowed, readFile } from '@utils/helper';
import Image from 'next/image';
import { ChangeEvent, useRef, useState } from 'react';
import { StyledProfileImage } from './style';

const ProfileImage = () => {
    const imageUploader = useRef<HTMLInputElement>(null);
    const [image, setImage] = useState<string>('');
    const [isOpenDialog, setIsOpenDialog] = useState<boolean>(false);
    const [croppedImage, setCroppedImage] = useState<string>('');
    const dispatch = useAppDispatch();
    const user = useAppSelector(userSelector);

    const { isUserProfileImageLoading, isUserProfileImageDeleteLoading } =
        useAppSelector(usersSelector);

    const fileDeleteHandler = () => {
        dispatch(
            deleteProfileImage({ publicId: user.data.publicId as string })
        );
        setCroppedImage('');
    };

    const fileCancelHandler = () => {
        setImage('');
        setCroppedImage('');
    };

    const uploadUserImageHandler = () => {
        const file = dataUrlToFile(croppedImage, 'file');
        dispatch(addProfileImage({ file }));
    };

    const fileUploadHandler = async (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            const file = e.target.files[0];
            if (!file) {
                return;
            }
            try {
                // if (isFileExceedsSizeLimit(file)) {
                //     throw new Error(FILE_ERROR_TYPES.LIMIT_FILE_SIZE.msg);
                // }
                if (!isFileFormatAllowed(file.type)) {
                    throw new Error(FILE_ERROR_TYPES.INVALID_FILE_TYPE.msg);
                }
                const fileData = await readFile(file);
                setImage(fileData);
                setIsOpenDialog(true);
            } catch (error: any) {
                dispatch(
                    showNotification({ message: error.message, type: 'error' })
                );
            }
        }
    };
    return (
        <>
            <StyledProfileImage>
                {croppedImage || user?.data.url ? (
                    <Image
                        alt=""
                        layout="fill"
                        priority
                        src={
                            user?.data.url
                                ? `${FILE_UPLOAD_BASE_URL}/${user.data.url}`
                                : croppedImage
                        }
                    />
                ) : (
                    <Text>No Image</Text>
                )}
            </StyledProfileImage>
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
                    marginBottom: '2rem',
                }}
            >
                <Button
                    isDisabled={
                        !!croppedImage ||
                        !!user?.data?.url ||
                        isUserProfileImageLoading
                    }
                    onMouseDown={() => imageUploader?.current?.click()}
                    onTouchStart={() => imageUploader?.current?.click()}
                    variant="primary"
                >
                    select
                </Button>
                <Button
                    isDisabled={!croppedImage || !!user?.data?.url}
                    isLoading={isUserProfileImageLoading}
                    onClick={uploadUserImageHandler}
                    variant="primary"
                >
                    upload
                </Button>
                {user?.data?.url ? (
                    <Button
                        isLoading={isUserProfileImageDeleteLoading}
                        onClick={fileDeleteHandler}
                        variant="primary"
                    >
                        delete
                    </Button>
                ) : (
                    <Button
                        isDisabled={!croppedImage || isUserProfileImageLoading}
                        onClick={fileCancelHandler}
                        variant="primary"
                    >
                        cancel
                    </Button>
                )}
            </Box>
            <ImageCropper
                aspectRatio={1}
                background={false}
                guides={false}
                height="400px"
                initialAspectRatio={1}
                isOpen={isOpenDialog}
                onClose={() => setIsOpenDialog(false)}
                responsive={true}
                setCroppedImage={setCroppedImage}
                src={image}
                width="100%"
            />
        </>
    );
};

export default ProfileImage;
