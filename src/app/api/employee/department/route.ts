import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { Department } from "@/interfaces/employee/Department.interface";
import { error } from "console";

export async function POST(request: { json: () => Department }) {
  const prisma = new PrismaClient();

  try {
    const data = await request.json();
    const { name } = data;

    if (!name) {
      return NextResponse.json(
        {
          message: "empty department name",
        },
        { status: 400 }
      );
    }

    const department = await prisma.department.create({
      data: {
        name,
      },
    });

    return NextResponse.json({
      message: "Department successfully registered",
      department: department,
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

export async function GET() {
  const prisma = new PrismaClient();

  try {
    const departments = await prisma.department.findMany();
    if (!departments) {
      throw new Error(error as unknown as string);
    } else {
      return NextResponse.json(departments);
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
