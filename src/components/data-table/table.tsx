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
import { useEffect, useState } from "react";
import { Department } from "@/interfaces/employee/Department.interface";
import Swal from "sweetalert2";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";

const DataTable: React.FC<{ data: Department[] }> = ({ data }) => {
  const router = useRouter();
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
  // console.log(filteredData);
  const [datos, setDatos] = useState(filteredData)

 

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  const handleClearSearch = () => {
    setSearchValue("");
  };
  
  const handleDelete = async (e: any) => {
    const { isConfirmed } = await Swal.fire({
      title: "¿you want to delete the department?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, delete department",
      cancelButtonText: "No, cancelar",
    });

    if (isConfirmed) {
      
      try {
        const departmentDelete = await axios.delete(
          `/api/employee/department/${e}`
        );
        const { name } = departmentDelete.data;
        if (departmentDelete.statusText === "OK") {
          toast.info(`${name} was removed from department`);
          router.refresh();
         router.push('/employee/department/all')
          
          return 

        } else {
          toast.warning(`Error department deleting`);

          return;
        }
      } catch (error) {
        console.error("Error ", error);
      }
    }
  };

  const handleEdit = (e: any) => alert(`Editing department  # ${e}`);

  return (
    <section className="h-[calc(100vh-7rem)] justify-center items-center flex">
      <div className="rounded-md border">
        <div className="search-container justify-end flex">
          <input
            type="text"
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

export default DataTable;
