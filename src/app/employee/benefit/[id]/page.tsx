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
const EditBenefitPage = ({ params }: { params: Params }) => {
  const router = useRouter();

  const [loading, setLoading] = useState(true);

  async function fetchBenefit() {
    try {
      const resp = await axios.get(`/api/employee/benefit/${params.id}`);
      const { name } = resp.data;
      // console.log(name);
      setValue("name", name);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching benefit:", error);
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchBenefit();
  }, [params.id]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setValue,
  } = useForm();

  const onSubmit = handleSubmit(async (data) => {
    const updateBenefit = await axios.put(
      `/api/employee/benefit/${params.id}`,
      data
    );
    reset();
    if (updateBenefit.statusText) {
      toast.info("Benefit Edited");
      setTimeout(() => {
        router.refresh();
        router.push("/employee/benefit/all");
      }, 1200);
    }
  });

  return (
    <div className="h-[calc(100vh-7rem)] flex justify-center items-center">
      {loading ? (       
        <img src="/loading.svg" alt="Loading" />
      ) : (
        <form onSubmit={onSubmit} className="w-1/4">
          <h1 className="text-slate-200 font-bold text-4xl mb-4">Benefit</h1>
          <label htmlFor="name" className="text-slate-500 mb-2 block">
            Name
          </label>
          <input
            type="text"
            {...register("name", {
              required: {
                value: true,
                message: "Benefit name is required",
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
              onClick={() => router.push("/employee/benefit/all")}
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

export default EditBenefitPage;
