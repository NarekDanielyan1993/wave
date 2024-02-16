import { Box, Button } from '@chakra-ui/react';
import { Table, type TableColumn } from '@components/table';
import { PRODUCTS_TABLE_COLUMNS } from '@constant/table';
import { useAppDispatch, useAppSelector } from '@store/create-store';
import { deleteProduct, getPaginatedProducts } from '@store/products/action';
import { paginatedProductsSelector } from '@store/products/selectors';
import { useState } from 'react';
import type { IProductResponse } from 'types/product';
import AddProductDialog from './addProductDialog';
import EditProductDialog from './editProductDialog';
import ProductSearchForm from './poductSearchForm';

const AdminProducts = () => {
    const {
        products,
        paginationData,
        isProductsLoading: isLoading,
    } = useAppSelector(paginatedProductsSelector);
    const dispatch = useAppDispatch();
    const [isDialogOpen, setIsDialogOpen] = useState<undefined | boolean>(
        undefined
    );
    const [dialogOpen, setDialogOpen] = useState<undefined | boolean>(
        undefined
    );
    const [removeProduct, setRemoveProduct] = useState<string>('');

    const columns: TableColumn<IProductResponse>[] = PRODUCTS_TABLE_COLUMNS;

    const productUpdateHandler = () => {
        const product = products.find(produc => produc.id === removeProduct);
        setDialogOpen(product);
    };

    return (
        <>
            <ProductSearchForm />
            <Box display="flex" gap={2}>
                <Button
                    isDisabled={!removeProduct}
                    onClick={productUpdateHandler}
                    variant="primary"
                >
                    edit
                </Button>
                <Button
                    isDisabled={!removeProduct}
                    onClick={() =>
                        dispatch(deleteProduct({ id: removeProduct }))
                    }
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
                manualPagination={true}
                paginationData={paginationData}
                setId={setRemoveProduct}
            />
            <Button onClick={() => setIsDialogOpen(true)} variant="primary">
                Add product
            </Button>
            {isDialogOpen && (
                <AddProductDialog
                    isOpen={isDialogOpen}
                    onClose={() => setIsDialogOpen(false)}
                />
            )}
            {dialogOpen && (
                <EditProductDialog
                    data={dialogOpen}
                    isOpen={!!dialogOpen}
                    onClose={() => setDialogOpen(undefined)}
                    row={isDialogOpen}
                />
            )}
        </>
    );
};

export default AdminProducts;
