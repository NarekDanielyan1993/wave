import { Box, Checkbox } from '@chakra-ui/react';
import Loader from '@components/loader';
import useDidUpdate from '@hooks/useDidUpdate';
import usePagination from '@hooks/usePagination';
import { type AnyAction } from '@reduxjs/toolkit';
import { useAppDispatch } from '@store/create-store';
import type { DeepKeys } from '@tanstack/react-table';
import {
    createColumnHelper,
    flexRender,
    getCoreRowModel,
    getPaginationRowModel,
    useReactTable,
} from '@tanstack/react-table';
import EditProductDialog from 'module/dashboard/admin/products/editProductDialog';
import { useCallback, useMemo, useState } from 'react';
import {
    type GetPaginatedProductsActionPayload,
    type IPaginatedDataResponse,
} from 'types';
import { type ColumnTypesUnion } from 'types/table';
import {
    StyledTHead,
    StyledTable,
    StyledTbody,
    StyledTbodyTr,
    StyledTd,
    StyledTdText,
    StyledTh,
    StyledTheadTr,
} from './style';

export type TableColumn<T> = {
    accessorKey: DeepKeys<T>;
    type: ColumnTypesUnion;
    headerName: string;
    isVisible: boolean;
    id: keyof T;
    cellRenderer?: (info: any) => React.ReactNode;
};

// eslint-disable-next-line react/function-component-definition
export function Table<T>({
    cols,
    data,
    isLoading,
    manualPagination = false,
    paginationData,
    getPaginatedData,
}: {
    data: T[];
    isLoading: boolean;
    cols: TableColumn<T>[];
    variant?: string;
    manualPagination: boolean;
    paginationData: IPaginatedDataResponse<keyof T, number>;
    getPaginatedData: (data: GetPaginatedProductsActionPayload) => AnyAction;
}): JSX.Element {
    const columnHelper = createColumnHelper<T>();
    const [isDialogOpen, setIsDialogOpen] = useState<undefined | object>(
        undefined
    );

    const renderColumn = useCallback((type: ColumnTypesUnion) => {
        switch (type) {
            case 'boolean': {
                // TODO ALIGN CHECKBOX TO THE CENTER IN COLUMN
                return (info: any) => <Checkbox checked />;
            }
            default: {
                return (info: any) => info.getValue();
            }
        }
    }, []);

    const newColumns = useMemo(() => {
        if (!Array.isArray(cols)) {
            return [];
        }
        return cols.map((col: TableColumn<T>) =>
            columnHelper.accessor(col.accessorKey, {
                cell: renderColumn(col.type),
                header: col.headerName,
            })
        );
    }, [cols]);

    const { limit, totalItems, page } = paginationData;

    const dispatch = useAppDispatch();

    const table = useReactTable({
        data,
        columns: newColumns,
        enableHiding: true,
        initialState: {
            pagination: {
                pageIndex: 0,
                pageSize: limit,
            },
            columnVisibility: cols.reduce(
                (acc: Record<string, boolean>, item) => {
                    if (!item.isVisible) {
                        acc[item.headerName] = false;
                    }
                    return acc;
                },
                {}
            ),
        },
        pageCount: Math.ceil(totalItems / limit),
        getCoreRowModel: getCoreRowModel(),
        ...(paginationData && {
            getPaginationRowModel: getPaginationRowModel(),
        }),
        manualPagination,
        debugTable: true,
        debugHeaders: true,
        debugColumns: true,
    });

    useDidUpdate(() => {
        if (!manualPagination) {
            return;
        }
        dispatch(
            getPaginatedData({
                page: table.getState().pagination.pageIndex,
                limit,
                ...(paginationData.filters && {
                    filters: paginationData.filters,
                }),
            })
        );
    }, [table.getState().pagination.pageIndex]);

    const paginationProps = {
        currentPage: table.getState().pagination.pageIndex,
        getNextPage: table.nextPage,
        getPrevPage: table.previousPage,
        hasPrevPage: table.getCanPreviousPage(),
        hasNextPage: table.getCanNextPage(),
        pageCount: Math.ceil(totalItems / limit),
        setCurrentPage: table.setPageIndex,
        getPaginatedData,
    };

    const Toolbar = usePagination(paginationProps);

    return (
        <Box style={{ position: 'relative' }}>
            {isLoading && <Loader />}
            <StyledTable size="md">
                <StyledTHead>
                    {table.getHeaderGroups().map(headerGroup => (
                        <StyledTheadTr key={headerGroup.id}>
                            {headerGroup.headers.map(header => (
                                <StyledTh key={header.id}>
                                    <StyledTdText>
                                        {flexRender(
                                            header.column.columnDef.header,
                                            header.getContext()
                                        )}
                                    </StyledTdText>
                                </StyledTh>
                            ))}
                        </StyledTheadTr>
                    ))}
                </StyledTHead>
                <StyledTbody>
                    {table.getRowModel().rows.map(row => (
                        <>
                            <StyledTbodyTr key={row.id}>
                                {row.getVisibleCells().map(cell => (
                                    <>
                                        <StyledTd key={cell.id}>
                                            <StyledTdText>
                                                {flexRender(
                                                    cell.column.columnDef.cell,
                                                    cell.getContext()
                                                )}
                                            </StyledTdText>
                                        </StyledTd>
                                    </>
                                ))}
                            </StyledTbodyTr>
                        </>
                    ))}
                    {isDialogOpen && (
                        <EditProductDialog
                            isOpen={!!isDialogOpen}
                            onClose={() => setIsDialogOpen(undefined)}
                            row={isDialogOpen}
                        />
                    )}
                </StyledTbody>
            </StyledTable>
            <Box mt="4">{paginationData && Toolbar}</Box>
        </Box>
    );
}
