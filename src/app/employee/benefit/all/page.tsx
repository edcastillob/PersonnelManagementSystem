"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import  Benefit  from "@/interfaces/employee/Benefit.interface";
import DataTableBenefit from "@/components/employee/benefit/table";



const BenefitPage = () => {
  const [benefit, setBenefit] = useState<Benefit[]>([]);


  

  const loadBenefit = async () => {
    try {
      const response = await axios.get("/api/employee/benefit");
      // const sortedBenefit = response.data
      const sortedBenefit = response.data.sort(
        (a: Benefit, b: Benefit) => a.name.localeCompare(b.name)
      );
      setBenefit(sortedBenefit);
    } catch (error) {
      console.error("Error loading benefit:", error);
    }
  };

  useEffect(() => {
    loadBenefit();
  }, []);

  return (
    <div>    
       <DataTableBenefit data={benefit} setBenefit={setBenefit}/>
    </div>
  );
};

export default BenefitPage;
