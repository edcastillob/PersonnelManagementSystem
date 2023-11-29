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
import  Benefit from "@/interfaces/employee/Benefit.interface";
import Swal from "sweetalert2";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";

const DataTableBenefit: React.FC<{
  data: Benefit[];
  setBenefit: React.Dispatch<React.SetStateAction<Benefit[]>>;
}> = ({ data, setBenefit }) => {
  const router = useRouter();
  const [searchValue, setSearchValue] = useState("");

  const columns: ColumnDef<Benefit, Benefit>[] = [
    {
      header: "ID Benefit",
      accessorKey: "id_benefit",
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
      title: "¿you want to delete the benefit?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete benefit",
      cancelButtonText: "No, cancelar",
    });

    if (isConfirmed) {
      try {
        const benefitDelete = await axios.delete(
          `/api/employee/benefit/${e}`
        );
        const { name } = benefitDelete.data;
        if (benefitDelete.statusText === "OK") {
          toast.info(`${name} was removed from benefit`);
          router.refresh();

          setBenefit((prevBenefit) =>
            prevBenefit.filter((u) => u.id_benefit !== e)
          );

          return;
        } else {
          toast.warning(`Error Benefit deleting`);

          return;
        }
      } catch (error) {
        console.error("Error ", error);
      }
    }
  };

  const handleEdit = async (e: any) => {
    const { isConfirmed } = await Swal.fire({
      title: "¿you want to Update the benefit?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, update benefit",
      cancelButtonText: "No, cancelar",
    });

    if (isConfirmed) {
      router.push(`/employee/benefit/${e}`);
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
              filteredData.map((item: Benefit) => (
                <TableRow
                  key={`${item.id_benefit}-${
                    Math.floor(Math.random() * 80000) + 10000
                  }`}
                >
                  {columns.map((column) => (
                    <TableCell
                      key={`${item.id_benefit}-${
                        Math.floor(Math.random() * 90000) + 10000
                      }`}
                    >
                      {column.header === "Delete" ? (
                        <button
                          onClick={() => handleDelete(item.id_benefit)}
                        >
                          <img
                            src="/delete.png"
                            alt="Delete"
                            width={15}
                            height={15}
                          />
                        </button>
                      ) : column.header === "Edit" ? (
                        <button onClick={() => handleEdit(item.id_benefit)}>
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

export default DataTableBenefit;
