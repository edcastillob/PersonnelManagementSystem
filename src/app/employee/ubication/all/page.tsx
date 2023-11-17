"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import { Ubication } from "@/interfaces/employee/Ubication.interface";
import DataTableUbication from "@/components/employee/ubication/table";



const DepartmentsPage = () => {
  const [ubications, setUbications] = useState<Ubication[]>([]);


  

  const loadUbications = async () => {
    try {
      const response = await axios.get("/api/employee/ubication");
      // const sortedDepartments = response.data
      const sortedUbications = response.data.sort(
        (a: Ubication, b: Ubication) => a.name.localeCompare(b.name)
      );
      setUbications(sortedUbications);
    } catch (error) {
      console.error("Error loading ubication:", error);
    }
  };

  useEffect(() => {
    loadUbications();
  }, []);

  return (
    <div>    
       <DataTableUbication data={ubications} setDepartments={setUbications}/>
    </div>
  );
};

export default DepartmentsPage;
