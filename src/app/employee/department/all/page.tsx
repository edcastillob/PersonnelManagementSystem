"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import { Department } from "@/interfaces/employee/Department.interface";
import DataTable from "@/components/employee/department/data-table/table";



const DepartmentsPage = () => {
  const [departments, setDepartments] = useState<Department[]>([]);


  

  const loadDepartments = async () => {
    try {
      const response = await axios.get("/api/employee/department");
      // const sortedDepartments = response.data
      const sortedDepartments = response.data.sort(
        (a: Department, b: Department) => a.name.localeCompare(b.name)
      );
      setDepartments(sortedDepartments);
    } catch (error) {
      console.error("Error loading departments:", error);
    }
  };

  useEffect(() => {
    loadDepartments();
  }, []);

  return (
    <div>    
       <DataTable data={departments} setDepartments={setDepartments}/>
    </div>
  );
};

export default DepartmentsPage;
