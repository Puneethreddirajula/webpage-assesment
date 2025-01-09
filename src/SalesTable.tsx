import React from 'react';
// @ts-ignore
import { useTable, useSortBy, Column, TableInstance, HeaderGroup, Row, Cell } from 'react-table';
import 'tailwindcss/tailwind.css';
import { useSelector } from 'react-redux';
import { RootState } from './store/store';

interface Data {
    weekEnding: string;
    formattedDate: string;
    retailSalesStr: string;
    wholesaleSalesStr: string;
    unitsSold: number;
    retailerMarginStr: string;
}

const columns: Column<Data>[] = [
    { Header: 'Week Ending', accessor: 'formattedDate' },
    { Header: 'Retail Sales', accessor: 'retailSalesStr' },
    { Header: 'Wholesale Sales', accessor: 'wholesaleSalesStr' },
    { Header: 'Units Sold', accessor: 'unitsSold' },
    { Header: 'Retailer Margin', accessor: 'retailerMarginStr' },
];

const SalesTable: React.FC = () => {
    const data = useSelector((state: RootState) => state.data.data.sales);

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    }: TableInstance<Data> = useTable(
        { columns, data: data || [] },
        useSortBy
    );

    return (
        <table {...getTableProps()} className="min-w-full bg-white">
            <thead>
            {headerGroups.map((headerGroup: HeaderGroup<Data>) => (
                <tr {...headerGroup.getHeaderGroupProps()} className="bg-gray-200" key={headerGroup.id}>
                    {headerGroup.headers.map((column: Column<Data>) => (
                        <th
                            {...column.getHeaderProps(column.getSortByToggleProps())}
                            className="text-sm px-4 py-2 text-left cursor-pointer text-grey-text"
                            key={column.id}
                        >
                            {column.render('Header')}
                            {/* Add sort direction indicator */}
                            <span className={!column.isSorted ? 'text-grey-arrow' : ''}>
                                    {column.isSorted ? (column.isSortedDesc ? ' ▼' : ' ▲') : ' ▼'}
                                </span>
                        </th>
                    ))}
                </tr>
            ))}
            </thead>
            <tbody {...getTableBodyProps()}>
            {rows.map((row: Row<Data>) => {
                prepareRow(row);
                return (
                    <tr {...row.getRowProps()} key={row.id + row.index}>
                        {row.cells.map((cell: Cell<Data>) => (
                            <td
                                {...cell.getCellProps()}
                                className="border-t-2 border-grey-background px-4 py-2 text-sm text-grey-text"
                                key={cell.column.id}
                            >
                                {cell.render('Cell')}
                            </td>
                        ))}
                    </tr>
                );
            })}
            </tbody>
        </table>
    );
};

export default SalesTable;
