"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import { Department } from "@/interfaces/employee/Department.interface";

const DepartmentsPage = () => {
  const [departments, setDepartments] = useState<Department[]>([]);

  const loadDepartments = async () => {
    try {
      const response = await axios.get("/api/employee/department");
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
      <ul>
        {departments.map((department) => (
          <li key={department.id_department}>{department.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default DepartmentsPage;
