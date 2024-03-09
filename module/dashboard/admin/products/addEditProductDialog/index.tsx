import {
    Button,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    SimpleGrid,
} from '@chakra-ui/react';
import useForm from '@hooks/useForm';
import { useAppDispatch, useAppSelector } from '@store/create-store';
import { fretsSelector } from '@store/frets/selectors';
import { addProduct, editProduct } from '@store/products/action';
import {
    brandsSelector,
    paginatedProductsSelector,
    productsSelector,
} from '@store/products/selectors';
import {
    addEditProductSchema,
    addEditProductSchemaTypes,
} from 'common/validation/product';
import { useMemo } from 'react';
import { IProductResponse } from 'types/product';

const AddEditProductDialog = ({
    isOpen = false,
    onClose,
    data,
}: {
    data?: IProductResponse;
    isOpen: boolean;
    onClose: () => void;
}) => {
    const brands = useAppSelector(brandsSelector);
    const { images } = useAppSelector(productsSelector);
    const { frets } = useAppSelector(fretsSelector);
    const { paginationData } = useAppSelector(paginatedProductsSelector);
    const defaultValues = useMemo(() => {
        if (data) {
            const image = images.find(img => img?.productId === data.id);
            return {
                available: data.available,
                fretId: data.frets.id,
                price: data.price,
                model: data.model,
                woodType: data.woodType,
                description: data.description,
                brand: data.brand.id,
                shipping: data.shipping,
                file: image || null,
            };
        }
        return {
            available: '',
            fretId: frets[0]?.id,
            price: '',
            model: '',
            woodType: '',
            description: '',
            brand: brands[0]?.id,
            shipping: false,
            file: null,
        };
    }, []);
    const { FormField, handleSubmit } = useForm<addEditProductSchemaTypes>({
        defaultValues,
        validationSchema: addEditProductSchema,
    });

    const dispatch = useAppDispatch();

    const formSubmitHandler = (dat: addEditProductSchemaTypes) => {
        const newData = {
            brandId: dat.brand,
            model: dat.model,
            available: dat.available,
            fretId: dat.fretId,
            price: dat.price,
            woodType: dat.woodType,
            description: dat.description,
            file: dat.file,
            shipping: dat.shipping,
        };
        if (data) {
            dispatch(
                editProduct({
                    id: data.id as string,
                    ...newData,
                })
            );
        } else {
            dispatch(
                addProduct({ page: paginationData.page, limit: 10 }, newData)
            );
        }
        onClose();
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            scrollBehavior="inside"
            size="xl"
        >
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>{data ? 'edit' : 'Add'} Product</ModalHeader>
                <ModalBody>
                    <form
                        id="product-form"
                        onSubmit={handleSubmit(formSubmitHandler)}
                    >
                        {FormField({
                            name: 'file',
                            type: 'file',
                        })}
                        <SimpleGrid columns={2} spacingX="1rem">
                            {FormField({
                                name: 'model',
                                label: 'Model',
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
                                name: 'fretId',
                                label: 'Frets',
                                type: 'select',
                                options: frets.map(fret => ({
                                    id: fret.id,
                                    name: fret.frets,
                                })),
                            })}

                            {FormField({
                                name: 'price',
                                label: 'Price',
                            })}
                            {FormField({
                                name: 'available',
                                label: 'Available',
                            })}
                        </SimpleGrid>
                        {FormField({
                            name: 'description',
                            type: 'textarea',
                            label: 'Description',
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

export default AddEditProductDialog;
