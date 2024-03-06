/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Flex } from '@chakra-ui/react';
import { ALLOWED_FILE_TYPES } from '@constant/file';
import { useAppDispatch, useAppSelector } from '@store/create-store';
import { deleteSiteImage, uploadSiteImage } from '@store/site/action';
import { siteSelector } from '@store/site/selectors';
import {
    isFileExceedsSizeLimit,
    isFileFormatAllowed,
    readFile,
} from '@utils/helper';
import { ChangeEvent, useRef } from 'react';
import { ISiteImageResponse } from 'types/client/store/site';
import AttachmentList from './fileList';

const SiteSlider = () => {
    const fileRef = useRef<HTMLInputElement>(null);
    const dispatch = useAppDispatch();
    const { isSiteImageLoading } = useAppSelector(siteSelector);
    const fileDeleteHandler = (image: ISiteImageResponse) => {
        dispatch(deleteSiteImage({ id: image.id, publicId: image.publicId }));
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
                dispatch(uploadSiteImage({ name: file.name, url: fileData }));
            } catch (error) {
                console.error(error);
            }
        }
    };

    return (
        <Flex flexDir="column" gap={4} mt={4}>
            <input
                accept={ALLOWED_FILE_TYPES.join(',')}
                hidden
                onChange={fileUploadHandler}
                ref={fileRef}
                type="file"
            />
            <Button
                isLoading={isSiteImageLoading}
                onClick={() => fileRef?.current?.click()}
                variant="primary"
            >
                upload
            </Button>
            <AttachmentList onRemove={fileDeleteHandler} />
        </Flex>
    );
};

export default SiteSlider;
