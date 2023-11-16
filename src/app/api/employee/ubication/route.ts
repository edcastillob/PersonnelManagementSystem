import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { Ubication } from "@/interfaces/employee/Ubication.interface";
import { error } from "console";

export async function POST(request: { json: () => Ubication }) {
  const prisma = new PrismaClient();

  try {
    const data = await request.json();
    const { name } = data;

    if (!name) {
      return NextResponse.json(
        {
          message: "empty ubication name",
        },
        { status: 400 }
      );
    }

    const ubication = await prisma.ubication.create({
      data: {
        name,
      },
    });

    return NextResponse.json({
      message: "Ubication successfully registered",
      ubication,
    });
  } catch (error) {
    console.error("Error registering the ubication:", error);
    return NextResponse.json(
      {
        message: "Error registering the ubication.",
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
    const ubications = await prisma.ubication.findMany();
    if (!ubications) {
      throw new Error(error as unknown as string);
    } else {
      return NextResponse.json(ubications);
    }
  } catch (error) {
    console.error("Error searching ubication:", error);
    return NextResponse.json(
      {
        message: "Error searching ubication",
      },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
