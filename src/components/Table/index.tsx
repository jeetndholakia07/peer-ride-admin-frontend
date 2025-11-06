import React, { useState } from 'react';
import {
    useReactTable,
    getCoreRowModel,
    flexRender,
    getSortedRowModel,
    type ColumnSort
} from '@tanstack/react-table';

import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper
} from '@mui/material';

import TableActions from "./TableActions.js";

type TableProps = {
    children?: React.ReactNode;
    data: any;
    columns: any[];
    isActions?: boolean;
}

const Index: React.FC<TableProps> = ({ data, columns, children, isActions = false }) => {

    const [sorting, setSorting] = useState<ColumnSort[]>([]);

    const table = useReactTable({
        data,
        columns,
        state: {
            sorting
        },
        onSortingChange: setSorting,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
    });

    return (
        <>
            <TableContainer component={Paper} elevation={0}
                className="!shadow-none !bg-transparent !rounded-none pb-0"
            >
                <Table size="small" className="!align-middle font-semibold text-gray-600">
                    <TableHead className="!text-muted uppercase bg-whitetext-xs font-bold">
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id} className="text-start font-bold uppercase tracking-wide">
                                {headerGroup.headers.map((header) => {
                                    const canSort = header.column.getCanSort();
                                    const isSorted = header.column.getIsSorted();
                                    return (
                                        <TableCell
                                            key={header.id}
                                            colSpan={header.colSpan}
                                            onClick={header.column.getToggleSortingHandler()}
                                            className={`min-w-[125px] !text-gray-800 !border-b !border-dashed !border-gray-200 whitespace-nowrap 
                                            px-4 py-3 !font-bold text-xs uppercase ${canSort ? "cursor-pointer select-none" : ""
                                                }`}
                                            sx={{ fontFamily: 'Poppins, sans-serif', fontSize: '14px' }}
                                        >
                                            <div className="flex items-center gap-1">
                                                {!header.isPlaceholder &&
                                                    flexRender(header.column.columnDef.header, header.getContext())}
                                                {canSort && (
                                                    <span className=" !text-gray-600 !text-sm">
                                                        {isSorted === false && <i className="bi bi-arrow-down-up" />}
                                                        {isSorted === "asc" && <i className="bi bi-arrow-up" />}
                                                        {isSorted === "desc" && <i className="bi bi-arrow-down" />}
                                                    </span>
                                                )}
                                            </div>
                                        </TableCell>
                                    );
                                })}
                                {isActions && <TableCell className="!text-gray-800 !w-25 !border-b !p-0 !border-dashed !border-gray-200 whitespace-nowrap 
                                 !font-bold text-xs uppercase">
                                    Actions
                                </TableCell>}
                            </TableRow>
                        ))}
                    </TableHead>


                    <TableBody className="divide-y divide-gray-100 !text-black">
                        {table.getRowModel().rows.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={columns.length} align="center" className="!border-none py-6 text-sm"
                                    sx={{ fontFamily: 'Poppins, sans-serif', fontSize: '14px' }}>
                                    No data available
                                </TableCell>
                            </TableRow>
                        ) : (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    className="!border-none"
                                >
                                    {row.getVisibleCells().map((cell) => {
                                        const cellValue = cell.getValue();
                                        const renderedValue = cellValue === "" ? "-" : flexRender(cell.column.columnDef.cell, cell.getContext());;
                                        return (
                                            <TableCell
                                                key={cell.id}
                                                sx={{ fontFamily: 'Poppins, sans-serif', fontSize: '14px' }}
                                                className="!px-6 !py-3 !border-none !text-md whitespace-nowrap !align-middle"
                                            >
                                                {renderedValue}
                                            </TableCell>
                                        );
                                    })}
                                    {isActions && <TableCell className="!p-0 !w-25 !border-none !text-md whitespace-nowrap !align-right">
                                        <TableActions row={row.original} />
                                    </TableCell>}
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
            {children && children}
        </>
    );
};

export default Index;
