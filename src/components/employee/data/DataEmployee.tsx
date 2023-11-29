'use client';
import { useForm } from "react-hook-form";
import axios from 'axios';
import { useRouter } from 'next/navigation'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDropzone } from 'react-dropzone';
import { useEffect, useState } from "react";
import Department from "@/interfaces/employee/Department.interface";
import Position from "@/interfaces/employee/Position.interface";
import Ubication from "@/interfaces/employee/Ubication.interface";
import Role from "@/interfaces/employee/Role.interface";
import Benefit from "@/interfaces/employee/Benefit.interface";

const DataEmployee = () => {
  const router = useRouter();
  const [uploadedImage, setUploadedImage] = useState<{ url: string; file: File } | null>(null);
  const [departments, setDepartments] = useState<Department[]>([]);
  const [position, setPosition] = useState<Position[]>([]);
  const [ubication, setUbication] = useState<Ubication[]>([]);
  const [role, setRole] = useState<Role[]>([]);
  const [benefit, setBenefit] = useState<Benefit[]>([]);

  // const { getRootProps, getInputProps } = useDropzone({
  //   accept: 'image/*',
  //   onDrop: (acceptedFiles) => {
  //     // Lógica de carga de Cloudinary
  //     setUploadedImage({
  //       url: URL.createObjectURL(acceptedFiles[0]),
  //       file: acceptedFiles[0],
  //     });
  //   },
  // });
  
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  console.log()

  const fetchData = async (
    url: string, 
    setter: React.Dispatch<React.SetStateAction<any[]>>) => {
    try {
      const response = await axios.get(url);
      setter(response.data);
    } catch (error) {
      console.error('Error fetching data', error);
    }
  };
  

  useEffect(() => {
    fetchData('/api/employee/department', setDepartments);
    fetchData('/api/employee/position', setPosition);
    fetchData('/api/employee/ubication', setUbication);
    fetchData('/api/employee/role', setRole);
    fetchData('/api/employee/benefit', setBenefit);
  }, []);

  
  return (
    <div className="mt-16 flex justify-center items-center">
      <form className="w-1/4">
        <h1 className="text-slate-200 font-bold text-4xl mb-4">
          New Employee
        </h1>
        <label htmlFor="dni" className="text-slate-500 mb-2 block">
         <b>DNI</b> 
        </label>
        <input
          type="number"
          {...register("dni", {
            required: {
              value: true,
              message: "Employee dni is required",
            },
          })}
          className="p-3 rounded block mb-2 bg-slate-900 text-slate-300 w-full"
          placeholder="...Insert DNI"
        />
        {errors.dni && (
          <span className="text-red-500  text-xs">
            {typeof errors.dni.message === "string"
              ? errors.dni.message
              : "Error occurred"}
          </span>
        )}

<label htmlFor="username" className="text-slate-500 mb-2 block">
         <b>Username</b> 
        </label>
        <input
          type="text"
          {...register("username", {
            required: {
              value: true,
              message: "Employee username is required",
            },
          })}
          className="p-3 rounded block mb-2 bg-slate-900 text-slate-300 w-full"
          placeholder="...Insert username"
        />
        {errors.username && (
          <span className="text-red-500  text-xs">
            {typeof errors.username.message === "string"
              ? errors.username.message
              : "Error occurred"}
          </span>
        )}
       
       <label htmlFor="fullname" className="text-slate-500 mb-2 block">
         <b>Fullname</b> 
        </label>
        <input
          type="text"
          {...register("fullname", {
            required: {
              value: true,
              message: "Employee fullname is required",
            },
          })}
          className="p-3 rounded block mb-2 bg-slate-900 text-slate-300 w-full"
          placeholder="...Insert fullname"
        />
        {errors.fullname && (
          <span className="text-red-500  text-xs">
            {typeof errors.fullname.message === "string"
              ? errors.fullname.message
              : "Error occurred"}
          </span>
        )}

<label htmlFor="email" className="text-slate-500 mb-2 block">
         <b>Email</b> 
        </label>
        <input
          type="email"
          {...register("email", {
            required: {
              value: true,
              message: "Employee email is required",
            },
          })}
          className="p-3 rounded block mb-2 bg-slate-900 text-slate-300 w-full"
          placeholder="...Insert email"
        />
        {errors.email && (
          <span className="text-red-500  text-xs">
            {typeof errors.email.message === "string"
              ? errors.email.message
              : "Error occurred"}
          </span>
        )}

<label htmlFor="gender" className="text-slate-500 mb-2 block">
        <b>Gender</b>
        </label>
        <select
          {...register("gender", {
            required: {
              value: true,
              message: "Employee gender is required",
            },
          })}
          className="p-3 rounded block mb-2 bg-slate-900 text-slate-300 w-full"
        >
          <option value="NotDefined">Select Gender</option>
          <option value="M">Male</option>
          <option value="F">Female</option>
          <option value="NotDefined">No defined</option>
        </select>
        {errors.gender && (
          <span className="text-red-500 text-xs">
            {typeof errors.gender.message === "string" ? errors.gender.message : "Error occurred"}
          </span>
        )}

<label htmlFor="birthdate" className="text-slate-500 mb-2 block">
  <b>Birthdate</b>
</label>
<input
  type="date"
  {...register("birthdate", {
    required: {
      value: true,
      message: "Employee birthdate is required",
    },
  })}
  className="p-3 rounded block mb-2 bg-slate-900 text-slate-300 w-full"
/>
{errors.birthdate && (
  <span className="text-red-500 text-xs">
    {typeof errors.birthdate.message === "string" ? errors.birthdate.message : "Error occurred"}
  </span>
)}

<label htmlFor="civil_status" className="text-slate-500 mb-2 block">
        <b>Civil Status</b>
        </label>
        <select
          {...register("civil_status", {
            required: {
              value: true,
              message: "Employee civil status is required",
            },
          })}
          className="p-3 rounded block mb-2 bg-slate-900 text-slate-300 w-full"
        >
          {/* Soltero-Casado-Viudo-Divorciado-separado-conviviente o union libre */}
          <option value="NotDefined">Select Civil Status</option>
          <option value="Single">Single</option> 
          <option value="Married">Married</option>
          <option value="Widowed">Widowed</option>
          <option value="Divorced">Divorced</option>
          <option value="Separated">Separated</option>
          <option value="LivingTogether">Living Together</option>
        </select>
        {errors.civil_status && (
          <span className="text-red-500 text-xs">
            {typeof errors.civil_status.message === "string" ? errors.civil_status.message : "Error occurred"}
          </span>
        )}

{/* <label htmlFor="photo" className="text-slate-500 mb-2 block">
  <b>Photo</b>
</label>
<div {...getRootProps()} className="dropzone">
  <input
    {...getInputProps()}
    onChange={(e) => {
      const selectedFile = e.target.files && e.target.files[0];

      if (selectedFile) {
        console.log('Photo File:', selectedFile);

        // También puedes acceder a la URL del archivo si lo necesitas
        const fileUrl = URL.createObjectURL(selectedFile);
        console.log('Photo URL:', fileUrl);
      }
    }}
  />
  <p>Drag 'n' drop a photo here, or click to select one</p>
</div>
{uploadedImage && (
  <div>
    <p>Uploaded Photo:</p>
    <img src={uploadedImage.url} alt="Uploaded" className="w-32 h-32" />
  </div>
)} */}

{/* <label htmlFor="photo" className="text-slate-500 mb-2 block">
          <b>Photo</b>
        </label>
        <div {...getRootProps()} className="dropzone">
          <input {...getInputProps()} />
          <p>Drag 'n' drop a photo here, or click to select one</p>
        </div>
        {uploadedImage && (
          <div>
            <p>Uploaded Photo:</p>
            <img src={uploadedImage.url} alt="Uploaded" className="w-32 h-32" />
          </div>
        )} */}


<label htmlFor="address" className="text-slate-500 mb-2 block">
         <b>Address</b> 
        </label>
        <input
          type="text"
          {...register("address", {
            required: {
              value: true,
              message: "Employee address is required",
            },
          })}
          className="p-3 rounded block mb-2 bg-slate-900 text-slate-300 w-full"
          placeholder="...Insert address"
        />
        {errors.address && (
          <span className="text-red-500  text-xs">
            {typeof errors.address.message === "string"
              ? errors.address.message
              : "Error occurred"}
          </span>
        )}

<label htmlFor="phone" className="text-slate-500 mb-2 block">
         <b>Phone</b> 
        </label>
        <input
          type="text"
          {...register("phone", {
            required: {
              value: true,
              message: "Employee phone is required",
            },
          })}
          className="p-3 rounded block mb-2 bg-slate-900 text-slate-300 w-full"
          placeholder="...Insert phone"
        />
        {errors.phone && (
          <span className="text-red-500  text-xs">
            {typeof errors.phone.message === "string"
              ? errors.phone.message
              : "Error occurred"}
          </span>
        )}

<label htmlFor="department" className="text-slate-500 mb-2 block">
          <b>Department</b>
        </label>
        <select
          {...register("department", {
            required: {
              value: true,
              message: "Employee department is required",
            },
          })}
          className="p-3 rounded block mb-2 bg-slate-900 text-slate-300 w-full"
        >
          <option value="">Select Department</option>
          {departments.map((department) => (
            <option key={department.id_department} value={department.id_department}>
              {department.name}
            </option>
          ))}
        </select>
        {errors.department && (
          <span className="text-red-500 text-xs">
            {typeof errors.department.message === "string" ? errors.department.message : "Error occurred"}
          </span>
        )}

<label htmlFor="position" className="text-slate-500 mb-2 block">
          <b>Position</b>
        </label>
        <select
          {...register("position", {
            required: {
              value: true,
              message: "Employee position is required",
            },
          })}
          className="p-3 rounded block mb-2 bg-slate-900 text-slate-300 w-full"
        >
          <option value="">Select position</option>
          {position.map((pos) => (
            <option key={pos.id_cargo} value={pos.id_cargo}>
              {pos.name}
            </option>
          ))}
        </select>
        {errors.position && (
          <span className="text-red-500 text-xs">
            {typeof errors.position.message === "string" ? errors.position.message : "Error occurred"}
          </span>
        )}
        
        
<label htmlFor="start_date" className="text-slate-500 mb-2 block">
  <b>Start Date</b>
</label>
<input
  type="date"
  {...register("start_date", {
    required: {
      value: true,
      message: "Employee start date is required",
    },
  })}
  className="p-3 rounded block mb-2 bg-slate-900 text-slate-300 w-full"
/>
{errors.start_date && (
  <span className="text-red-500 text-xs">
    {typeof errors.start_date.message === "string" ? errors.start_date.message : "Error occurred"}
  </span>
)}

<label htmlFor="end_date" className="text-slate-500 mb-2 block">
  <b>End Date</b>
</label>
<input
  type="date"
  {...register("end_date", {
    required: {
      value: true,
      message: "Employee end date is required",
    },
  })}
  className="p-3 rounded block mb-2 bg-slate-900 text-slate-300 w-full"
/>
{errors.end_date && (
  <span className="text-red-500 text-xs">
    {typeof errors.end_date.message === "string" ? errors.end_date.message : "Error occurred"}
  </span>
)} 

<label htmlFor="ubication" className="text-slate-500 mb-2 block">
          <b>Ubication</b>
        </label>
        <select
          {...register("ubication", {
            required: {
              value: true,
              message: "Employee ubication is required",
            },
          })}
          className="p-3 rounded block mb-2 bg-slate-900 text-slate-300 w-full"
        >
          <option value="">Select ubication</option>
          {ubication.map((ubication) => (
            <option key={ubication.id_ubication} value={ubication.id_ubication}>
              {ubication.name}
            </option>
          ))}
        </select>
        {errors.ubication && (
          <span className="text-red-500 text-xs">
            {typeof errors.ubication.message === "string" ? errors.ubication.message : "Error occurred"}
          </span>
        )}


<label htmlFor="role" className="text-slate-500 mb-2 block">
          <b>Role</b>
        </label>
        <select
          {...register("role", {
            required: {
              value: true,
              message: "Employee role is required",
            },
          })}
          className="p-3 rounded block mb-2 bg-slate-900 text-slate-300 w-full"
        >
          <option value="">Select role</option>
          {role.map((role) => (
            <option key={role.id_role} value={role.id_role}>
              {role.name}
            </option>
          ))}
        </select>
        {errors.role && (
          <span className="text-red-500 text-xs">
            {typeof errors.role.message === "string" ? errors.role.message : "Error occurred"}
          </span>
        )}

<label htmlFor="salary" className="text-slate-500 mb-2 block">
  <b>Salary</b> 
</label>
<input
  type="text"
  {...register("salary", {
    required: {
      value: true,
      message: "Employee salary is required",
    },
    pattern: {
      value: /^[0-9]+(?:\.[0-9]{1,2})?$/,
      message: "Invalid salary format. Use a dot as the decimal separator (e.g., 232.36)",
    },
  })}
  className="p-3 rounded block mb-2 bg-slate-900 text-slate-300 w-full"
  placeholder="...Insert salary"
/>
{errors.salary && (
  <span className="text-red-500 text-xs">
    {typeof errors.salary.message === "string"
      ? errors.salary.message
      : "Error occurred"}
  </span>
)}

<label htmlFor="benefit" className="text-slate-500 mb-2 block">
          <b>Benefit</b>
        </label>
        <select
          {...register("benefit", {
            required: {
              value: true,
              message: "Employee benefit is required",
            },
          })}
          className="p-3 rounded block mb-2 bg-slate-900 text-slate-300 w-full"
        >
          <option value="">Select Benefit</option>
          {benefit.map((benefit) => (
            <option key={benefit.id_benefit} value={benefit.id_benefit}>
              {benefit.name}
            </option>
          ))}
        </select>
        {errors.benefit && (
          <span className="text-red-500 text-xs">
            {typeof errors.benefit.message === "string" ? errors.benefit.message : "Error occurred"}
          </span>
        )}



        
        <button 
        className="w-full bg-indigo-600 text-white p-3 rounded-lg mt-2"
        >
          Register Employee
        </button>

      </form>
      <ToastContainer />
    </div>
  );
};

export default DataEmployee


