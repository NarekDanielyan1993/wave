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
import { useAppDispatch } from '@store/create-store';
import { editProduct } from '@store/products/action';
import {
    editProductSchema,
    type editProductSchemaTypes,
} from 'common/validation/product';
import { IProduct } from 'types/product';

const EditProductDialog = ({
    row,
    isOpen,
    onClose,
    data,
}: {
    data: IProduct;
    row: any;
    isOpen: boolean;
    onClose: () => void;
}) => {
    const { FormField, handleSubmit } = useForm<editProductSchemaTypes>({
        defaultValues: {
            model: data.model,
            available: Number(data.available),
        },
        validationSchema: editProductSchema,
    });

    const dispatch = useAppDispatch();

    const formSubmitHandler = (dat: editProductSchemaTypes) => {
        dispatch(
            editProduct({
                id: data.id as string,
                available: Number(dat.available),
                model: dat.model,
            })
        );
        onClose();
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Edit Product</ModalHeader>
                <ModalBody>
                    <form
                        id="edit-form"
                        onSubmit={handleSubmit(formSubmitHandler)}
                    >
                        {FormField({
                            label: 'Model',
                            name: 'model',
                        })}
                        {FormField({
                            label: 'Available',
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
