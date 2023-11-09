"use client";
// import  './Table.css';
import {
  ColumnDef,
  getCoreRowModel,
  flexRender,
  useReactTable,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  SortingColumn,
} from "@tanstack/react-table";
import React, {useState} from "react";

const DataTable: React.FC<{ data: any[] }> = ({ data }) => {
    const [sort, setSort] = useState<any>([{}]);
      
   
      

  console.log(data);
  const columns: ColumnDef<any, any>[] = [
    {
      header: "ID",
      accessorKey: "id_department",
      footer: "myId",
    },
    {
      header: "Name",
      accessorKey: "name",
      footer: "Name",
    },
  ];

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    state:{
        sort
    }, 
    onSortingChange: (newSort) => {
        setSort(newSort);
      }
  });

  return (
    <div className="flex justify-center items-center h-screen bg-dark-100">
      <table className="table-auto">
        <thead className="bg-gray-800 text-white">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id} className="py-2 px-4 text-left"
                onClick={header.column.getToggleSortingHandler()}
                >

                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                  {{"asc": "⬆️", "desc" : "⬇️"}[
                    header.column.getIsSorted() ?? null
                  ]}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row, index) => (
            <tr
              key={row.id}
              className={`${
                index % 2 === 0 ? "bg-gray-700" : "bg-gray-600"
              } hover:bg-gray-500`}
            >
              {row.getVisibleCells().map((cell) => (
                <td className="py-2 px-4">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
        {/* <tfoot className="bg-gray-800 text-white">
          {table.getFooterGroups().map((footerGroup) => (
            <tr key={footerGroup.id}>
              {footerGroup.headers.map((footer) => (
                <th key={footer.id} className="py-2 px-4 text-left">
                  {flexRender(
                    footer.column.columnDef.footer,
                    footer.getContext()
                  )}
                </th>
              ))}
            </tr>
          ))}
        </tfoot> */}
        </table>
      <button
        onClick={() => table.setPageIndex(0)}
        className="bg-gray-700 text-white px-4 py-2 mr-2"
        >
        First Page
      </button>
      <button
        onClick={() => table.nextPage()}
        className="bg-gray-700 text-white px-4 py-2 mr-2"
      >
        &gt;&gt;
      </button>
      <button
        onClick={() => table.previousPage()}
        className="bg-gray-700 text-white px-4 py-2 mr-2"
        >
        &lt;&lt;
      </button>
      <button
        onClick={() =>
            (table as any).setPageIndex((table as any).setPageCount() - 1)
        }
        className="bg-gray-700 text-white px-4 py-2"
        >
        Last Page
      </button>
    </div>  
  );
};

export default DataTable;
