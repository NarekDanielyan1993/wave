import { Box, Button, Text } from '@chakra-ui/react';
import ImageCropper from '@components/cropper';
import { ALLOWED_FILE_TYPES, FILE_UPLOAD_BASE_URL } from '@constant/file';
import { useAppDispatch, useAppSelector } from '@store/create-store';
import { addProfileImage, deleteProfileImage } from '@store/user/action';
import { userSelector, usersSelector } from '@store/user/selectors';
import {
    isFileExceedsSizeLimit,
    isFileFormatAllowed,
    readFile,
} from '@utils/helper';
import Image from 'next/image';
import { ChangeEvent, useRef, useState } from 'react';

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
        dispatch(deleteProfileImage({ publicId: user.data.publicId }));
        setCroppedImage('');
    };
    const uploadUserImageHandler = () => {
        dispatch(addProfileImage({ file: croppedImage }));
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
                setImage(fileData);
                setIsOpenDialog(true);
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
                    width: '200px',
                    height: '200px',
                    aspectRatio: 1,
                    margin: '0 auto',
                    position: 'relative',
                    mb: 6,
                    overflow: 'hidden',
                    borderRadius: '50%',
                    boxShadow: 'md',
                }}
            >
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
                    isDisabled={
                        !!croppedImage ||
                        !!user?.data?.url ||
                        isUserProfileImageLoading
                    }
                    onClick={() => imageUploader?.current?.click()}
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
                        isDisabled={!croppedImage}
                        onClick={() => {
                            setImage('');
                            setCroppedImage('');
                        }}
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
