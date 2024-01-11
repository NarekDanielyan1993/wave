import { Button } from '@chakra-ui/react';
import { Table, type TableColumn } from '@components/table';
import { PRODUCTS_TABLE_COLUMNS } from '@constant/table';
import { useAppSelector } from '@store/create-store';
import { getPaginatedProducts } from '@store/products/action';
import { paginatedProductsSelector } from '@store/products/selectors';
import { useState } from 'react';
import type { IProductResponse } from 'types/product';
import AddProductDialog from './addProductDialog';
import ProductSearchForm from './poductSearchForm';

const AdminProducts = () => {
    const {
        products,
        paginationData,
        isProductsLoading: isLoading,
    } = useAppSelector(paginatedProductsSelector);
    const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

    const columns: TableColumn<IProductResponse>[] = PRODUCTS_TABLE_COLUMNS;

    return (
        <>
            <ProductSearchForm />
            <Table<IProductResponse>
                cols={columns}
                data={products}
                getPaginatedData={getPaginatedProducts}
                isLoading={isLoading}
                manualPagination={true}
                paginationData={paginationData}
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
        </>
    );
};

export default AdminProducts;
