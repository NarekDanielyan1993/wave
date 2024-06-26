import {
    Button,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
} from '@chakra-ui/react';
import useForm from '@hooks/useForm';
import { useAppDispatch, useAppSelector } from '@store/create-store';
import { addFrets, editFrets } from '@store/frets/action';
import { paginatedProductsSelector } from '@store/products/selectors';
import {
    addEditFretsSchema,
    addEditFretsSchemaTypes,
} from 'common/validation/frets';
import { useMemo } from 'react';
import { FormProvider } from 'react-hook-form';
import { GetFretsResponse } from 'types/client/store/frets';

const AddEditFretsDialog = ({
    isOpen = false,
    onClose,
    data,
}: {
    data?: GetFretsResponse;
    isOpen: boolean;
    onClose: () => void;
}) => {
    const { paginationData } = useAppSelector(paginatedProductsSelector);
    const defaultValues = useMemo(() => {
        if (data) {
            return {
                frets: data.frets,
            };
        }
        return {
            frets: '',
        };
    }, []);

    const methods = useForm<addEditFretsSchemaTypes>({
        validationSchema: addEditFretsSchema,
        defaultValues,
    });

    const { TextField, handleSubmit } = methods;

    const dispatch = useAppDispatch();

    const formSubmitHandler = (dat: addEditFretsSchemaTypes) => {
        const newData = {
            frets: dat.frets,
        };
        if (data) {
            dispatch(
                editFrets({
                    id: data.id as string,
                    ...newData,
                })
            );
        } else {
            dispatch(
                addFrets({ page: paginationData.page, limit: 10 }, newData)
            );
        }
        onClose();
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} scrollBehavior="inside">
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>{data ? 'edit' : 'Add'} Fret</ModalHeader>
                <FormProvider {...methods}>
                    <ModalBody>
                        <form
                            id="fret-form"
                            onSubmit={handleSubmit(formSubmitHandler)}
                        >
                            <TextField label="Frets" name="frets" />
                        </form>
                    </ModalBody>
                </FormProvider>
                <ModalFooter display="flex" gap={2}>
                    <Button form="fret-form" type="submit" variant="primary">
                        {data ? 'edit' : 'add'}
                    </Button>
                    <Button onClick={onClose} variant="primary">
                        close
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default AddEditFretsDialog;
