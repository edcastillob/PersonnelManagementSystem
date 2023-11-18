import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import  Employee  from "@/interfaces/employee/Employee.interface";
import { error } from "console";

export async function POST(request: { json: () => Employee }) {
  const prisma = new PrismaClient();

  try {
    const data = await request.json();
    // const { name } = data;

    // if (!name) {
    //   return NextResponse.json(
    //     {
    //       message: "empty department name",
    //     },
    //     { status: 400 }
    //   );
    // }

    // const department = await prisma.department.create({
    //   data: {
    //     name,
    //   },
    // });

    return NextResponse.json({
      message: "Data successfully registered",
      data: data,
    });
  } catch (error) {
    console.error("Error registering the department:", error);
    return NextResponse.json(
      {
        message: "Error registering the apartment.",
      },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

