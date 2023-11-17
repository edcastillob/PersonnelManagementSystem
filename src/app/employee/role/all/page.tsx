"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import { Role } from "@/interfaces/employee/Role.interface";
import DataTableRole from "@/components/employee/role/table";



const RolesPage = () => {
  const [role, setRole] = useState<Role[]>([]);


  

  const loadRoles = async () => {
    try {
      const response = await axios.get("/api/employee/role");
      // const sortedRoles = response.data
      const sortedRoles = response.data.sort(
        (a: Role, b: Role) => a.name.localeCompare(b.name)
      );
      setRole(sortedRoles);
    } catch (error) {
      console.error("Error loading role:", error);
    }
  };

  useEffect(() => {
    loadRoles();
  }, []);

  return (
    <div>    
       <DataTableRole data={role} setRole={setRole}/>
    </div>
  );
};

export default RolesPage;
