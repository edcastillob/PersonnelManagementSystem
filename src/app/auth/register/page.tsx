"use client";
import { useForm } from "react-hook-form";
import axios from 'axios';
import { useRouter } from 'next/navigation'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const RegisterPage = () => {
const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = handleSubmit(async(data) => {
    if (data.password !== data.confirmPassword) {
      toast.warning("Passwords do not match");
    } else {    
        const userNew = await axios.post('/api/auth/register', data);
        console.log('respuesta del back: ', userNew);
        if(userNew.statusText)router.push('/auth/login');
        
   
    }
  });
  return (
    <div className="h-[calc(100vh-7rem)] flex justify-center items-center">
      <form onSubmit={onSubmit} className="w-1/4">
        <h1 className="text-slate-200 font-bold text-4xl mb-4">
          Register User
        </h1>
        <label htmlFor="username" className="text-slate-500 mb-2 block">
          Username
        </label>
        <input
          type="text"
          {...register("username", {
            required: {
              value: true,
              message: "Username is required",
            },
          })}
          className="p-3 rounded block mb-2 bg-slate-900 text-slate-300 w-full"
          placeholder="yourUserName"
        />
        {errors.username && (
          <span className="text-red-500  text-xs">
            {typeof errors.username.message === "string"
              ? errors.username.message
              : "Error occurred"}
          </span>
        )}

        <label htmlFor="email" className="text-slate-500 mb-2 block">
          Email
        </label>
        <input
          type="email"
          {...register("email", {
            required: {
              value: true,
              message: "Email is required",
            },
          })}
          className="p-3 rounded block mb-2 bg-slate-900 text-slate-300 w-full"
          placeholder="user@mail.com"
        />
         {errors.email && (
          <span className="text-red-500  text-xs">
            {typeof errors.email.message === "string"
              ? errors.email.message
              : "Error occurred"}
          </span>
        )}
        <label htmlFor="password" className="text-slate-500 mb-2 block">
          Password
        </label>
        <input
          type="password"
          {...register("password", {
            required: {
              value: true,
              message: "Insert password",
            },
          })}
          className="p-3 rounded block mb-2 bg-slate-900 text-slate-300 w-full"
          placeholder="**********"
        />
         {errors.password && (
          <span className="text-red-500  text-xs">
            {typeof errors.password.message === "string"
              ? errors.password.message
              : "Error occurred"}
          </span>
        )}
        <label htmlFor="confirmPassword" className="text-slate-500 mb-2 block">
          Confirm Password
        </label>
        <input
          type="password"
          {...register("confirmPassword", {
            required: {
              value: true,
              message: "Confirm password",
            },
          })}
          className="p-3 rounded block mb-2 bg-slate-900 text-slate-300 w-full"
          placeholder="**********"
        />
         {errors.confirmPassword && (
          <span className="text-red-500  text-xs">
            {typeof errors.confirmPassword.message === "string"
              ? errors.confirmPassword.message
              : "Error occurred"}
          </span>
        )}
        <button 
        className="w-full bg-indigo-600 text-white p-3 rounded-lg mt-2"
        disabled={errors.username || errors.email || errors.password || errors.confirmPassword ? true : false}
        >
          Register
        </button>

      </form>
      <ToastContainer />
    </div>
  );
};

export default RegisterPage;
