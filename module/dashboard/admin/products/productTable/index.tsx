import { Box, Button } from '@chakra-ui/react';
import { Table, TableColumn } from '@components/table';
import { PRODUCTS_TABLE_COLUMNS } from '@constant/table';
import { useAppDispatch, useAppSelector } from '@store/create-store';
import { deleteProduct, getPaginatedProducts } from '@store/products/action';
import { paginatedProductsSelector } from '@store/products/selectors';
import { useState } from 'react';
import { IProductResponse } from 'types/product';
import AddEditProductDialog from '../addEditProductDialog';

const ProductTable = () => {
    const {
        products,
        paginationData,
        isProductsLoading: isLoading,
    } = useAppSelector(paginatedProductsSelector);
    const dispatch = useAppDispatch();

    const [dialogAddOpen, setDialogAddOpen] = useState<
        IProductResponse | boolean
    >(false);

    const [dialogEditOpen, setDialogEditOpen] = useState<
        IProductResponse | boolean
    >(false);

    const [selectedProduct, setSelectedProduct] = useState<string[]>([]);

    const columns: TableColumn<IProductResponse>[] = PRODUCTS_TABLE_COLUMNS;

    const productUpdateHandler = () => {
        const product = products.find(
            produc => produc.id === selectedProduct[0]
        );
        setDialogEditOpen(product);
    };
    const removeProductHandler = () => {
        dispatch(deleteProduct({ id: selectedProduct[0] }));
        setSelectedProduct([]);
    };
    return (
        <>
            <Box display="flex" gap={2}>
                <Button
                    isDisabled={!selectedProduct.length}
                    onClick={productUpdateHandler}
                    variant="primary"
                >
                    edit
                </Button>
                <Button
                    isDisabled={!selectedProduct.length}
                    onClick={removeProductHandler}
                    variant="primary"
                >
                    delete
                </Button>
            </Box>
            <Table<IProductResponse>
                cols={columns}
                data={products}
                getPaginatedData={getPaginatedProducts}
                isLoading={isLoading}
                key={products}
                manualPagination={true}
                paginationData={paginationData}
                selectedRow={selectedProduct}
                setSelectedRow={setSelectedProduct}
            />
            <Button onClick={() => setDialogAddOpen(true)} variant="primary">
                Add product
            </Button>
            {dialogAddOpen && (
                <AddEditProductDialog
                    isOpen={!!dialogAddOpen}
                    onClose={() => setDialogAddOpen(false)}
                />
            )}
            {dialogEditOpen && (
                <AddEditProductDialog
                    data={dialogEditOpen}
                    isOpen={!!dialogEditOpen}
                    onClose={() => setDialogEditOpen(false)}
                />
            )}
        </>
    );
};

export default ProductTable;
