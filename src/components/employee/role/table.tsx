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
import { Role } from "@/interfaces/employee/Role.interface";
import Swal from "sweetalert2";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";

const DataTableRole: React.FC<{
  data: Role[];
  setRole: React.Dispatch<React.SetStateAction<Role[]>>;
}> = ({ data, setRole }) => {
  const router = useRouter();
  const [searchValue, setSearchValue] = useState("");

  const columns: ColumnDef<Role, Role>[] = [
    {
      header: "ID Role",
      accessorKey: "id_role",
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
      title: "¿you want to delete the role?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete role",
      cancelButtonText: "No, cancelar",
    });

    if (isConfirmed) {
      try {
        const roleDelete = await axios.delete(
          `/api/employee/role/${e}`
        );
        const { name } = roleDelete.data;
        if (roleDelete.statusText === "OK") {
          toast.info(`${name} was removed from role`);
          router.refresh();

          setRole((prevRole) =>
            prevRole.filter((u) => u.id_role !== e)
          );

          return;
        } else {
          toast.warning(`Error role deleting`);

          return;
        }
      } catch (error) {
        console.error("Error ", error);
      }
    }
  };

  const handleEdit = async (e: any) => {
    const { isConfirmed } = await Swal.fire({
      title: "¿you want to Update the role?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, update role",
      cancelButtonText: "No, cancelar",
    });

    if (isConfirmed) {
      router.push(`/employee/role/${e}`);
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
              filteredData.map((item: Role) => (
                <TableRow
                  key={`${item.id_role}-${
                    Math.floor(Math.random() * 80000) + 10000
                  }`}
                >
                  {columns.map((column) => (
                    <TableCell
                      key={`${item.id_role}-${
                        Math.floor(Math.random() * 90000) + 10000
                      }`}
                    >
                      {column.header === "Delete" ? (
                        <button
                          onClick={() => handleDelete(item.id_role)}
                        >
                          <img
                            src="/delete.png"
                            alt="Delete"
                            width={15}
                            height={15}
                          />
                        </button>
                      ) : column.header === "Edit" ? (
                        <button onClick={() => handleEdit(item.id_role)}>
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

export default DataTableRole;
