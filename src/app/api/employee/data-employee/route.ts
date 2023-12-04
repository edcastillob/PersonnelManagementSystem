import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import Employee from "@/interfaces/employee/Employee.interface";


export async function POST(request: { json: () => Employee }) {
  const prisma = new PrismaClient();

  const data = await request.json(); 

  try {
   
    const {
      dni,
      fullname,
      gender,
      birthdate: birthdateStr,
      civil_status,
      photo,
      address,
      phone,
      email,
      id_department,
      id_cargo,
      start_date: start_dateStr,
      end_date: endDateStr,
      id_ubication,
      salary,
      id_benefit,
      social_security,
      tax_identification,
      education_level,
      educational_degree,
      certifications,
      blood_type,
      allergic_to,
      contact_information,
      id_status,
      id_role,
      username,
    } = data;
    
    const employeeDniFound = await prisma.employee.findUnique({
      where: {
        dni: data.dni,
      },
    });

    if (employeeDniFound) {
      return NextResponse.json(
        {
          message: "Dni already exists",
        },
        {
          status: 400,
        }
      );
    }

    const employeeEmailFound = await prisma.employee.findUnique({
      where: {
        email: data.email,
      },
    });

    if (employeeEmailFound) {
      return NextResponse.json(
        {
          message: "Email already exists",
        },
        {
          status: 400,
        }
      );
    }

    const employeeUsernameFound = await prisma.employee.findUnique({
      where: {
        username: data.username,
      },
    });

    if (employeeUsernameFound) {
      return NextResponse.json(
        {
          message: "Username already exists",
        },
        {
          status: 400,
        }
      );
    }


   
    const parseSalary = +salary;
    const birthdate = new Date(birthdateStr);
    const start_date = new Date(start_dateStr);
    const end_date = endDateStr ? new Date(endDateStr) : null;
    console.log("_____",data)
    const employee = await prisma.employee.create({
      data: {
        dni,
        fullname,
        gender,
        birthdate: birthdate ?? "",
        civil_status,
        photo : photo ?? " ",
        address,
        phone,
        email,
        id_department: +id_department,
        id_cargo: +id_cargo,
        start_date,
        end_date,
        id_ubication: +id_ubication,
        salary: parseSalary,
        id_benefit: +id_benefit,
        social_security: social_security ?? "",
        tax_identification: tax_identification ?? "",
        education_level: education_level ?? "",
        educational_degree: educational_degree ?? "https://avatars.githubusercontent.com/u/127250105?s=96&v=4",
        certifications: certifications ?? "",
        blood_type: blood_type ?? "",
        allergic_to: allergic_to ?? "",
        contact_information: contact_information ?? "",
        id_status: +id_status,
        id_role: +id_role,
        username,
      },
    });

    return NextResponse.json({
      message: "Data successfully registered",
      data: employee,
    });
  } catch (error) {
    console.error("Error registering the employee:", error);
    return NextResponse.json(
      {
        message: "Error registering the employee.",
      },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}


export async function GET() {
  const prisma = new PrismaClient();

  try {
    const employees = await prisma.employee.findMany();
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
