"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useState } from "react";
import { Department } from "@/interfaces/employee/Department.interface";

const DataTable: React.FC<{ data: Department[] }> = ({ data }) => {
  const [searchValue, setSearchValue] = useState("");

  const columns: ColumnDef<Department, Department>[] = [
    {
      header: "ID Department",
      accessorKey: "id_department",
    },
    {
      header: "Name",
      accessorKey: "name",
    },
    { header: "Edit" },
    { header: "Delete" },
  ];

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const filteredData = data.filter((item) =>
    Object.values(item).some((value) =>
      value.toString().toLowerCase().includes(searchValue.toLowerCase())
    )
  );
  console.log(filteredData);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  const handleClearSearch = () => {
    setSearchValue("");
  };

  const handleDelete = (e: any) => alert(`Deleting department  # ${e}`);
  const handleEdit = (e: any) => alert(`Editing department  # ${e}`);

  return (
    <section className="h-[calc(100vh-7rem)] justify-center items-center flex">
      <div className="rounded-md border">
        <div className="search-container">
          <input
            type="text"
            placeholder="Search..."
            value={searchValue}
            onChange={handleSearchChange}
          />
          <button onClick={handleClearSearch}>
            <img className="mt-2 " src="/clean.png" alt="clean" width={20} height={25}/>
          </button>
        </div>
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>

          <TableBody>
            {filteredData.length ? (
              filteredData.map((item: Department) => (
                <TableRow key={item.id_department}>
                  {columns.map((column) => (
                    <TableCell key={item.id_department}>
                      {column.header === "Delete" ? (
                        <button
                          onClick={() => handleDelete(item.id_department)}
                        >
                          <img
                            src="/delete.png"
                            alt="Delete"
                            width={15}
                            height={15}
                          />
                        </button>
                      ) : column.header === "Edit" ? (
                        <button onClick={() => handleEdit(item.id_department)}>
                          <img
                            src="/edit.svg"
                            alt="Delete"
                            width={20}
                            height={20}
                          />
                        </button>
                      ) : (
                        (item[column.accessorKey] as string | number)
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  <img
                    className="justify-center items-center"
                    src="/loading.gif"
                    alt="/loading gif"
                    width={65}
                    height={65}
                  />
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </section>
  );
};

export default DataTable;
