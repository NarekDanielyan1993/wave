import {
    Button,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalOverlay,
} from '@chakra-ui/react';
import useForm from '@hooks/useForm';
import { useAppDispatch } from '@store/create-store';
import { editProduct } from '@store/products/action';
import {
    editProductSchema,
    type editProductSchemaTypes,
} from 'common/validation/product';

const EditProductDialog = ({
    row,
    isOpen,
    onClose,
}: {
    row: any;
    isOpen: boolean;
    onClose: () => void;
}) => {
    const { FormField, handleSubmit } = useForm<editProductSchemaTypes>({
        defaultValues: {
            model: row.original.model,
            available: Number(row.original.available),
        },
        validationSchema: editProductSchema,
    });

    const dispatch = useAppDispatch();

    const formSubmitHandler = (data: editProductSchemaTypes) => {
        dispatch(
            editProduct({
                id: row.original.id as string,
                available: Number(data.available),
                model: data.model,
            })
        );
        onClose();
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalBody>
                    <form
                        id="edit-form"
                        onSubmit={handleSubmit(formSubmitHandler)}
                    >
                        {FormField({
                            name: 'model',
                        })}
                        {FormField({
                            name: 'available',
                            type: 'number',
                        })}
                    </form>
                </ModalBody>
                <ModalFooter display="flex" gap={2}>
                    <Button form="edit-form" type="submit" variant="primary">
                        Edit
                    </Button>
                    <Button onClick={onClose} variant="primary">
                        close
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default EditProductDialog;
