import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import  Department  from "@/interfaces/employee/Department.interface";
import { error } from "console";


export async function DELETE(request: any, {params}: any){
    const id_department = +params.id;
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
  
  export async function GET(request: any, {params}: any){
    const id_department = +params.id;   
    const prisma = new PrismaClient();
  
    try {
        const department = await prisma.department.findUnique({
            where: {
                id_department
            },
         });
      
      if (!department) {
        throw new Error(error as unknown as string);
      }
      
         return NextResponse.json(department)            
      
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
  
  



 

  export async function PUT(request: { json: () => Department }, { params }: any) {
    const id_department = +params.id;
    const prisma = new PrismaClient();
  
    try {
      const depExist = await prisma.department.findUnique({
        where: {
          id_department,
        },
      });
  
      if (!depExist) {
        console.error("Error searching department:", error);
        return NextResponse.json(
          {
            message: "Error searching department",
          },
          { status: 404 }
        );
      }
      
        const data = await request.json();
        const { name } = data;
  
        const departmentUpdate = await prisma.department.update({
          where: {
            id_department,
          },
          data: {
            name,
          },
        });
  
        return NextResponse.json(departmentUpdate);
      
    } catch (error) {
      console.error('Error updating department:', error);
  
      return {
        status: 500,
        body: {
          message: 'Error updating department',
        },
      };
    } finally {
      await prisma.$disconnect();
    }
  }