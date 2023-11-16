import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { Position } from "@/interfaces/employee/Position.interface";
import { error } from "console";

export async function POST(request: { json: () => Position }) {
  const prisma = new PrismaClient();

  try {
    const data = await request.json();
    const { name } = data;

    if (!name) {
      return NextResponse.json(
        {
          message: "empty position name",
        },
        { status: 400 }
      );
    }

    const department = await prisma.cargo.create({
      data: {
        name,
      },
    });

    return NextResponse.json({
      message: "Position successfully registered",
      department: department,
    });
  } catch (error) {
    console.error("Error registering the position:", error);
    return NextResponse.json(
      {
        message: "Error registering the position.",
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
    const positions = await prisma.cargo.findMany();
    if (!positions) {
      throw new Error(error as unknown as string);
    } else {
      return NextResponse.json(positions);
    }
  } catch (error) {
    console.error("Error searching position:", error);
    return NextResponse.json(
      {
        message: "Error searching position",
      },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
