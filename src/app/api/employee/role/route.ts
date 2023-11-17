import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { Role } from "@/interfaces/employee/Role.interface";
import { error } from "console";

export async function POST(request: { json: () => Role }) {
  const prisma = new PrismaClient();

  try {
    const data = await request.json();
    const { name } = data;

    if (!name) {
      return NextResponse.json(
        {
          message: "empty role name",
        },
        { status: 400 }
      );
    }

    const role = await prisma.role.create({
      data: {
        name,
      },
    });

    return NextResponse.json({
      message: "Role successfully registered",
      role,
    });
  } catch (error) {
    console.error("Error registering the role:", error);
    return NextResponse.json(
      {
        message: "Error registering the role.",
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
    const roles = await prisma.role.findMany();
    if (!roles) {
      throw new Error(error as unknown as string);
    } else {
      return NextResponse.json(roles);
    }
  } catch (error) {
    console.error("Error searching role:", error);
    return NextResponse.json(
      {
        message: "Error searching role",
      },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
