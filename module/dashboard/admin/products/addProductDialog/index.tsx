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
import { addProduct } from '@store/products/action';
import {
    brandsSelector,
    paginatedProductsSelector,
} from '@store/products/selectors';
import {
    addProductSchema,
    type addProductSchemaTypes,
} from 'common/validation/product';

const AddProductDialog = ({
    isOpen = false,
    onClose,
}: {
    isOpen: boolean;
    onClose: () => void;
}) => {
    const { brands } = useAppSelector(brandsSelector);
    const { paginationData } = useAppSelector(paginatedProductsSelector);
    const { FormField, handleSubmit } = useForm<addProductSchemaTypes>({
        defaultValues: {
            available: null,
            frets: null,
            price: null,
            model: '',
            woodType: '',
            description: '',
            brand: brands[0]?.id,
            shipping: false,
            file: '',
        },
        validationSchema: addProductSchema,
    });

    const dispatch = useAppDispatch();

    const formSubmitHandler = (data: addProductSchemaTypes) => {
        const newData = {
            price: Number(data.price),
            available: Number(data.available),
            brandId: data.brand,
            frets: Number(data.frets),
            model: data.model,
            description: data.description,
            woodType: data.woodType,
            shipping: data.shipping,
            file: data.file,
        };
        dispatch(addProduct({ page: paginationData.page, limit: 10 }, newData));
        onClose();
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} scrollBehavior="inside">
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Add Product</ModalHeader>
                <ModalBody>
                    <form
                        id="product-form"
                        onSubmit={handleSubmit(formSubmitHandler)}
                    >
                        {FormField({
                            name: 'file',
                            type: 'file',
                        })}
                        {FormField({
                            name: 'model',
                            label: 'Model',
                        })}
                        {FormField({
                            name: 'frets',
                            label: 'Frets',
                        })}
                        {FormField({
                            name: 'woodType',
                            label: 'Wood type',
                        })}
                        {FormField({
                            name: 'brand',
                            type: 'select',
                            label: 'Brand',
                            options: brands.map(brand => ({
                                id: brand.id,
                                name: brand.name,
                            })),
                        })}
                        {FormField({
                            name: 'description',
                            type: 'textarea',
                            label: 'Description',
                        })}
                        {FormField({
                            name: 'price',
                            label: 'Price',
                        })}
                        {FormField({
                            name: 'available',
                            label: 'Available',
                        })}
                        {FormField({
                            name: 'shipping',
                            label: 'Shipping',
                            type: 'checkbox',
                        })}
                    </form>
                </ModalBody>
                <ModalFooter display="flex" gap={2}>
                    <Button form="product-form" type="submit" variant="primary">
                        add
                    </Button>
                    <Button onClick={onClose} variant="primary">
                        close
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default AddProductDialog;
