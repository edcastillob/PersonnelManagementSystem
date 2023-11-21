import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import  Employee  from "@/interfaces/employee/Employee.interface";
import { error } from "console";

export async function GET(request: any, {params}: any){
    const prisma = new PrismaClient(); 
    try {
      const employees = await prisma.employee.findUnique({
        where: {
            dni: params.id
        },
     });
      if (!employees) {
        throw new Error(Error as unknown as string);
      } else {
        return NextResponse.json(employees);
      }
    } catch (error) {
      console.error("Error searching employees:", error);
      return NextResponse.json(
        {
          message: "Error searching employees",
        },
        { status: 500 }
      );
    } finally {
      await prisma.$disconnect();
    }
  }

  export async function DELETE(request: any, {params}: any){   
    const prisma = new PrismaClient();  
    try {
        const employee = await prisma.employee.findUnique({
            where: {
                dni: params.id
            },
         });
      
      if (!employee) {
        throw new Error(error as unknown as string);
      } else {
        const employeeDelete = await prisma.employee.delete({
            where: {
                dni: params.id
            },
         });
         return NextResponse.json({
            "Employee DELETED": employeeDelete
         })    
        
      }
    } catch (error) {
      console.error("Employee does not exist:", error);
      return NextResponse.json(
        {
          message: "Employee does not exist",
        },
        { status: 500 }
      );
    } finally {
      await prisma.$disconnect();
    }
  }

  export async function PUT(request: { json: () => Employee }, { params }: any) {  
    const prisma = new PrismaClient();  
    try {
      const employee = await prisma.employee.findUnique({
        where: {
          dni : params.id,
        },
      });
  
      if (!employee) {
        console.error("Employee does not exist:", error);
        return NextResponse.json(
          {
            message: "Employee does not exist",
          },
          { status: 404 }
        );
      }
      
        const dataEmployee = await request.json();  
        const filteredDataEmployee = Object.fromEntries(
            Object.entries(dataEmployee).filter(([key, value]) => value !== undefined)
          );
        const employeeUpdate = await prisma.employee.update({
          where: {
            dni: params.id,
          },
          data: filteredDataEmployee
          
        });
  
        return NextResponse.json(employeeUpdate);
      
    } catch (error) {
      console.error('Error updating employee:', error);
  
      return {
        status: 500,
        body: {
          message: 'Error updating employee',
        },
      };
    } finally {
      await prisma.$disconnect();
    }
  }