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
import FileSelectInput from '@components/field/fileSelectInput';
import useForm from '@hooks/useForm';
import { useAppDispatch, useAppSelector } from '@store/create-store';
import { fretsSelector } from '@store/frets/selectors';
import { addProduct, editProduct } from '@store/products/productAction';
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
import { FormProvider } from 'react-hook-form';
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
    const brandOptions = brands.map(brand => ({
        id: brand.id,
        name: brand.name,
    }));

    const fretOptions = frets.map(fret => ({
        id: fret.id,
        name: fret.frets,
    }));
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
            available: 0,
            fretId: frets[0]?.id,
            price: 0,
            model: '',
            woodType: '',
            description: '',
            brand: brands[0]?.id,
            shipping: false,
            file: null,
        };
    }, []);

    const methods = useForm<addEditProductSchemaTypes>({
        validationSchema: addEditProductSchema,
        defaultValues,
    });

    const {
        TextField,
        CheckboxField,
        NumericField,
        Textarea,
        SelectField,
        handleSubmit,
    } = methods;

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
        <FormProvider {...methods}>
            <Modal
                isOpen={isOpen}
                onClose={onClose}
                scrollBehavior="inside"
                size="xl"
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>{data ? 'edit' : 'Add'}Product</ModalHeader>
                    <ModalBody>
                        <form
                            id="product-form"
                            onSubmit={handleSubmit(formSubmitHandler)}
                        >
                            <FileSelectInput name="file" />
                            <SimpleGrid columns={2} spacingX="1rem">
                                <TextField label="Model" name="model" />
                                <TextField label="Wood Type" name="woodType" />
                                <SelectField
                                    name="brand"
                                    options={brandOptions}
                                />
                                <SelectField
                                    name="fretId"
                                    options={fretOptions}
                                />
                                <NumericField
                                    label="Price"
                                    name="price"
                                    prefix="$"
                                />
                                <TextField label="Available" name="available" />
                            </SimpleGrid>
                            <Textarea label="Description" name="description" />
                            <CheckboxField label="Shipping" name="shipping" />
                        </form>
                    </ModalBody>
                    <ModalFooter display="flex" gap={2}>
                        <Button
                            form="product-form"
                            type="submit"
                            variant="primary"
                        >
                            {data ? 'edit' : 'add'}
                        </Button>
                        <Button onClick={onClose} variant="primary">
                            close
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </FormProvider>
    );
};

export default AddEditProductDialog;
