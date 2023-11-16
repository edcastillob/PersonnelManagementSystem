"use client";
import { useForm } from "react-hook-form";
import axios from 'axios';
import { useRouter } from 'next/navigation'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CreateUbicationPage = () => {
const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = handleSubmit(async(data) => {   
        const newUbication = await axios.post('/api/employee/ubication', data);
        reset();
    if (newUbication.statusText) {
      toast.info("Ubication created");
      return;
    }       
   
   
  });
  return (
    <div className="h-[calc(100vh-7rem)] flex justify-center items-center">
      <form onSubmit={onSubmit} className="w-1/4">
        <h1 className="text-slate-200 font-bold text-4xl mb-4">
          Ubication
        </h1>
        <label htmlFor="name" className="text-slate-500 mb-2 block">
          Name
        </label>
        <input
          type="text"
          {...register("name", {
            required: {
              value: true,
              message: "Ubication name is required",
            },
          })}
          className="p-3 rounded block mb-2 bg-slate-900 text-slate-300 w-full"
          placeholder="Enter Ubication Name...."
        />
        {errors.name && (
          <span className="text-red-500  text-xs">
            {typeof errors.name.message === "string"
              ? errors.name.message
              : "Error occurred"}
          </span>
        )}
       
        <button 
        className="w-full bg-indigo-600 text-white p-3 rounded-lg mt-2"
        >
          Register
        </button>

      </form>
      <ToastContainer />
    </div>
  );
};

export default CreateUbicationPage;
