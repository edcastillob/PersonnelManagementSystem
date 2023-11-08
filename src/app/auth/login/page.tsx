"use client";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { signIn, useSession } from "next-auth/react";

const LoginPage = () => {

  const { data: session } = useSession();  
  const router = useRouter();
  session && (router.push('/'))
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
    reset();
    if (res?.status !== 200) {
      toast.warning("Invalid Credentials");
      return;
    } else {
      toast.info(`Welcome ${data.email}`);
      setTimeout(() => {
        router.refresh();
        router.push("/");
      }, 2000);
    }
  });
  


  return (
    <div className="flex justify-center items-center h-[calc(100vh-7rem)]">
      <div className="w-1/4 flex flex-col items-center">
        <h1 className="text-slate-200 font-bold text-4xl mb-4">Login User</h1>
        <form className="w-full">
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
          <button
            className="w-full bg-indigo-600 text-white p-3 rounded-lg mt-2"
            onClick={onSubmit}
          >
            Login
          </button>
        </form>
        <div className="flex gap-x-2 mt-4">
          <button onClick={() => signIn("google")}>
            <img src="/google.png" alt="google" width="40" height="40" />
          </button>
          <button onClick={() => signIn("facebook")}>
            <img src="/facebook.png" alt="google" width="40" height="40" />
          </button>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default LoginPage;
