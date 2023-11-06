"use client";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { signIn } from "next-auth/react";

const LoginPage = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = handleSubmit(async (data) => {
    const res = await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
    });
    if (res?.status !== 200) {
      toast.warning("Invalid Credentials");
      reset();
      return;
    } else {
      reset();
      toast.info(`Welcome ${data.email}`);
      // setTimeout(() => {
      //   router.push("/");
      // }, 2000);
      router.push("/");
      router.refresh();

    }

  });

  return (
    <div className="h-[calc(100vh-7rem)] flex justify-center items-center">
      <form className="w-1/4" onSubmit={onSubmit}>
        <h1 className="text-slate-200 font-bold text-4xl mb-4">Login User</h1>
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
        <button className="w-full bg-indigo-600 text-white p-3 rounded-lg mt-2">
          Login
        </button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default LoginPage;
