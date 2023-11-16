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
import { SetStateAction, useState } from "react";
import { Position } from "@/interfaces/employee/Position.interface";
import Swal from "sweetalert2";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";

const DataTablePosition: React.FC<{
  data: Position[];
  setDepartments: React.Dispatch<React.SetStateAction<Position[]>>;
}> = ({ data, setDepartments }) => {
  const router = useRouter();
  const [searchValue, setSearchValue] = useState("");

  const columns: ColumnDef<Position, Position>[] = [
    {
      header: "ID Position",
      accessorKey: "id_cargo",
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

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  const handleClearSearch = () => {
    setSearchValue("");
  };

  const handleDelete = async (e: any) => {
    const { isConfirmed } = await Swal.fire({
      title: "¿you want to delete the position?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete position",
      cancelButtonText: "No, cancelar",
    });

    if (isConfirmed) {
      try {
        const positionDelete = await axios.delete(
          `/api/employee/position/${e}`
        );
        const { name } = positionDelete.data;
        if (positionDelete.statusText === "OK") {
          toast.info(`${name} was removed from position`);
          router.refresh();

          setDepartments((prevPosition) =>
            prevPosition.filter((position) => position.id_cargo !== e)
          );

          return;
        } else {
          toast.warning(`Error position deleting`);

          return;
        }
      } catch (error) {
        console.error("Error ", error);
      }
    }
  };

  const handleEdit = async (e: any) => {
    const { isConfirmed } = await Swal.fire({
      title: "¿you want to Update the position?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, update position",
      cancelButtonText: "No, cancelar",
    });

    if (isConfirmed) {
      router.push(`/employee/position/${e}`);
    }
  };

  return (
    <section className="h-[calc(100vh-7rem)] flex flex-col items-center mt-5">
      <div className="rounded-md border">
        <div className="search-container justify-end flex">
          <input
            type="text"
            id="searchInput"
            placeholder="Search..."
            value={searchValue}
            onChange={handleSearchChange}
            className="rounded px-4 ml-2 mt-2"
          />

          <button onClick={handleClearSearch}>
            <img
              className="mt-2 "
              src="/clean.png"
              alt="clean"
              width={20}
              height={25}
            />
          </button>
        </div>
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow
                key={`${headerGroup.id}-${
                  Math.floor(Math.random() * 90000) + 10000
                }`}
              >
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={`${headerGroup.id}-${
                      Math.floor(Math.random() * 70000) + 10000
                    }`}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>

          <TableBody>
            {filteredData.length ? (
              filteredData.map((item: Position) => (
                <TableRow
                  key={`${item.id_cargo}-${
                    Math.floor(Math.random() * 80000) + 10000
                  }`}
                >
                  {columns.map((column) => (
                    <TableCell
                      key={`${item.id_cargo}-${
                        Math.floor(Math.random() * 90000) + 10000
                      }`}
                    >
                      {column.header === "Delete" ? (
                        <button
                          onClick={() => handleDelete(item.id_cargo)}
                        >
                          <img
                            src="/delete.png"
                            alt="Delete"
                            width={15}
                            height={15}
                          />
                        </button>
                      ) : column.header === "Edit" ? (
                        <button onClick={() => handleEdit(item.id_cargo)}>
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
                <TableCell colSpan={columns.length}>
                  <div className="flex justify-between items-center flex-col">
                    <img
                      src="/loading.svg"
                      alt="/loading gif"
                      width={45}
                      height={45}
                    />
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <ToastContainer />
    </section>
  );
};

export default DataTablePosition;
