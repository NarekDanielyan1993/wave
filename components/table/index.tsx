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
import { useCallback, useMemo } from 'react';
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
    setId,
}: {
    data: T[];
    isLoading: boolean;
    cols: TableColumn<T>[];
    setId: (id: string) => void;
    variant?: string;
    manualPagination: boolean;
    paginationData: IPaginatedDataResponse<keyof T, number>;
    getPaginatedData: (data: GetPaginatedProductsActionPayload) => AnyAction;
}): JSX.Element {
    const columnHelper = createColumnHelper<T>();

    const renderColumn = useCallback(column => {
        if (column.type === 'boolean') {
            return (info: any) => <Checkbox checked />;
        }
        if (column.headerName === 'Amount') {
            return (info: any) => `${info.getValue()}$`;
        }
        return (info: any) => info.getValue();
    }, []);

    const newColumns = useMemo(() => {
        if (!Array.isArray(cols)) {
            return [];
        }
        return cols.map((col: TableColumn<T>) =>
            columnHelper.accessor(col.accessorKey, {
                cell: renderColumn(col),
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
                            <StyledTbodyTr
                                key={row.id}
                                onClick={() => setId(row.original.id)}
                            >
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
                </StyledTbody>
            </StyledTable>
            <Box mt="4">{paginationData && Toolbar}</Box>
        </Box>
    );
}
