import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import  Benefit  from "@/interfaces/employee/Benefit.interface";
import { error } from "console";

export async function POST(request: { json: () => Benefit }) {
  const prisma = new PrismaClient();

  try {
    const data = await request.json();
    const { name } = data;

    if (!name) {
      return NextResponse.json(
        {
          message: "empty benefit name",
        },
        { status: 400 }
      );
    }

    const benefit = await prisma.benefit.create({
      data: {
        name,
      },
    });

    return NextResponse.json({
      message: "Benefit successfully registered",
      benefit,
    });
  } catch (error) {
    console.error("Error registering the benefit:", error);
    return NextResponse.json(
      {
        message: "Error registering the benefit.",
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
    const benefit = await prisma.benefit.findMany();
    if (!benefit) {
      throw new Error(error as unknown as string);
    } else {
      return NextResponse.json(benefit);
    }
  } catch (error) {
    console.error("Error searching benefit:", error);
    return NextResponse.json(
      {
        message: "Error searching benefit",
      },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
