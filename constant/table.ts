import type { TableColumn } from '@components/table';
import { type IProductResponse } from 'types/product';

export const PRODUCTS_TABLE_COLUMNS: TableColumn<IProductResponse>[] = [
    // {
    //     headerName: 'Id',
    //     type: 'boolean',
    //     isVisible: true,
    //     accessorKey: 'id',
    //     id: 'id',
    // },
    {
        headerName: 'Model',
        type: 'text',
        isVisible: true,
        id: 'model',
        accessorKey: 'model',
    },
    {
        headerName: 'Wood Type',
        type: 'text',
        isVisible: false,
        id: 'woodType',
        accessorKey: 'woodType',
    },
    {
        headerName: 'Description',
        type: 'text',
        isVisible: false,
        accessorKey: 'description',
        id: 'description',
    },
    {
        headerName: 'Price',
        type: 'number',
        isVisible: false,
        accessorKey: 'price',
        id: 'price',
    },
    {
        headerName: 'Available',
        type: 'text',
        isVisible: true,
        id: 'available',
        accessorKey: 'available',
    },
    {
        headerName: 'Item Sold',
        type: 'number',
        isVisible: false,
        accessorKey: 'itemsSold',
        id: 'itemsSold',
    },
    {
        headerName: 'Shipping',
        type: 'boolean',
        isVisible: false,
        accessorKey: 'shipping',
        id: 'shipping',
    },
    {
        headerName: 'Created',
        type: 'date',
        isVisible: true,
        id: 'createdAt',
        accessorKey: 'createdAt',
    },
    {
        headerName: 'UpdatedAt',
        type: 'date',
        isVisible: false,
        id: 'updatedAt',
        accessorKey: 'updatedAt',
    },

    // TODO MAKE DB DATA LIKE BRAND: 'TEXT'
    // brand: {
    //     header: 'Brand',
    //     type: 'text',
    //     visible: false
    // },
];
