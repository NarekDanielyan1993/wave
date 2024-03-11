import { Box, Checkbox } from '@chakra-ui/react';
import Loader from '@components/loader';
import useDidUpdate from '@hooks/useDidUpdate';
import usePagination from '@hooks/usePagination';
import { type AnyAction } from '@reduxjs/toolkit';
import { useAppDispatch } from '@store/create-store';
import type { DeepKeys, RowSelectionState } from '@tanstack/react-table';
import {
    createColumnHelper,
    flexRender,
    getCoreRowModel,
    getPaginationRowModel,
    useReactTable,
} from '@tanstack/react-table';
import { isObjectEmpty, withCurrency } from '@utils/helper';
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
    setSelectedRow,
    selectedRow,
}: {
    data: T[];
    isLoading: boolean;
    cols: TableColumn<T>[];
    selectedRow: string[];
    setSelectedRow: (id: string[]) => void;
    variant?: string;
    manualPagination: boolean;
    paginationData: IPaginatedDataResponse<keyof T, number>;
    getPaginatedData: (data: GetPaginatedProductsActionPayload) => AnyAction;
}): JSX.Element {
    const columnHelper = createColumnHelper<T>();
    const [rowSelection, setRowSelection] = useState<RowSelectionState>({});

    const renderColumn = useCallback((props, column: TableColumn<T>) => {
        if (column.headerName.toLocaleLowerCase() === 'id') {
            return <Checkbox isChecked={props.row.getIsSelected()} />;
        }
        if (column.headerName.toLowerCase() === 'shipping') {
            return (
                <Checkbox
                    isChecked={props.getValue()}
                    sx={{ pointerEvents: 'none' }}
                />
            );
        }
        if (
            column.headerName.toLowerCase() === 'amount' ||
            column.headerName.toLowerCase() === 'price'
        ) {
            return withCurrency(props.getValue());
        }
        return props.getValue();
    }, []);

    const newColumns = useMemo(() => {
        if (!Array.isArray(cols)) {
            return [];
        }
        return cols.map((col: TableColumn<T>) =>
            columnHelper.accessor(col.accessorKey, {
                cell: props => renderColumn(props, col),
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
        getRowId: row => row.id,
        enableMultiRowSelection: false,
        ...(setSelectedRow && {
            onRowSelectionChange: setRowSelection,
        }),
        state: {
            rowSelection,
        },
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
        if (isObjectEmpty(rowSelection)) {
            setSelectedRow([]);
            return;
        }
        if (rowSelection) {
            setSelectedRow(Object.keys(rowSelection));
        }
    }, [rowSelection]);

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
                            <StyledTbodyTr
                                key={row.id}
                                onClick={row.getToggleSelectedHandler()}
                            >
                                {row.getVisibleCells().map(cell => (
                                    <StyledTd key={cell.id}>
                                        {flexRender(
                                            cell.column.columnDef.cell,
                                            cell.getContext()
                                        )}
                                    </StyledTd>
                                ))}
                            </StyledTbodyTr>
                        </>
                    ))}
                </StyledTbody>
            </StyledTable>
            <Box mt="4">{paginationData && Toolbar}</Box>
        </Box>
    );
}
