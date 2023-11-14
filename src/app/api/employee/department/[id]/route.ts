import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { Department } from "@/interfaces/employee/Department.interface";
import { error } from "console";


export async function DELETE(request: any, {params}: any){
    const id_department = +params.id;
    console.log(id_department)
    const prisma = new PrismaClient();
  
    try {
        const department = await prisma.department.findUnique({
            where: {
                id_department
            },
         });
      
      if (!department) {
        throw new Error(error as unknown as string);
      } else {
        const departmentDelete = await prisma.department.delete({
            where: {
               id_department
            },
         });
         return NextResponse.json(departmentDelete)    
        
      }
    } catch (error) {
      console.error("Error searching department:", error);
      return NextResponse.json(
        {
          message: "Error searching department",
        },
        { status: 500 }
      );
    } finally {
      await prisma.$disconnect();
    }
  }
  
  
  
  
  // }
  // export async function PUT(){
  //     return NextResponse.json({
  //         message: "Editando Datos!"
  //     })
  // }
  