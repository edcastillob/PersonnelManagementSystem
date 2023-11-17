"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import { Position } from "@/interfaces/employee/Position.interface";
import DataTablePosition from "@/components/employee/position/table";



const DepartmentsPage = () => {
  const [positions, setPositions] = useState<Position[]>([]);


  

  const loadPositions = async () => {
    try {
      const response = await axios.get("/api/employee/position");
      // const sortedDepartments = response.data
      const sortedPositions = response.data.sort(
        (a: Position, b: Position) => a.name.localeCompare(b.name)
      );
      setPositions(sortedPositions);
    } catch (error) {
      console.error("Error loading position:", error);
    }
  };

  useEffect(() => {
    loadPositions();
  }, []);

  return (
    <div>    
       <DataTablePosition data={positions} setDepartments={setPositions}/>
    </div>
  );
};

export default DepartmentsPage;
