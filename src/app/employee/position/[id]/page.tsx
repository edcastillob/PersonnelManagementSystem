"use client";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useState } from "react";

interface Params {
  id: string;
}
const EditPositionPage = ({ params }: { params: Params }) => {
  const router = useRouter();

  const [loading, setLoading] = useState(true);

  async function fetchPosition() {
    try {
      const resp = await axios.get(`/api/employee/position/${params.id}`);
      const { name } = resp.data;
      // console.log(name);
      setValue("name", name);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching position:", error);
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchPosition();
  }, [params.id]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setValue,
  } = useForm();

  const onSubmit = handleSubmit(async (data) => {
    const updatePosition = await axios.put(
      `/api/employee/position/${params.id}`,
      data
    );
    reset();
    if (updatePosition.statusText) {
      toast.info("Position Edited");
      setTimeout(() => {
        router.refresh();
        router.push("/employee/position/all");
      }, 1500);
    }
  });

  return (
    <div className="h-[calc(100vh-7rem)] flex justify-center items-center">
      {loading ? (       
        <img src="/loading.svg" alt="Loading" />
      ) : (
        <form onSubmit={onSubmit} className="w-1/4">
          <h1 className="text-slate-200 font-bold text-4xl mb-4">Position</h1>
          <label htmlFor="name" className="text-slate-500 mb-2 block">
            Name
          </label>
          <input
            type="text"
            {...register("name", {
              required: {
                value: true,
                message: "Position name is required",
              },
            })}
            className="p-3 rounded block mb-2 bg-slate-900 text-slate-300 w-full"
          />
          {errors.name && (
            <span className="text-red-500  text-xs">
              {typeof errors.name.message === "string"
                ? errors.name.message
                : "Error occurred"}
            </span>
          )}

          <div className="flex justify-between">
            <button
              className="w-1/2 bg-indigo-600 text-white p-3 rounded-lg mt-2 mr-1"
              type="submit"
            >
              Update
            </button>
            <button
              className="w-1/2 bg-red-600 text-white p-3 rounded-lg mt-2 ml-1"
              type="button"
              onClick={() => router.push("/employee/position/all")}
            >
              Cancel
            </button>
          </div>
        </form>
      )}
      <ToastContainer />
    </div>
  );
};

export default EditPositionPage;
