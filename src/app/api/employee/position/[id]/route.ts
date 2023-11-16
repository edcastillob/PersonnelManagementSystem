import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { Position } from "@/interfaces/employee/Position.interface";
import { error } from "console";

export async function DELETE(request: any, { params }: any) {
  const id_cargo = +params.id;
  const prisma = new PrismaClient();

  try {
    const position = await prisma.cargo.findUnique({
      where: {
        id_cargo,
      },
    });

    if (!position) {
      throw new Error(error as unknown as string);
    } else {
      const positionDelete = await prisma.cargo.delete({
        where: {
          id_cargo,
        },
      });
      return NextResponse.json(positionDelete);
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

export async function GET(request: any, { params }: any) {
  const id_cargo = +params.id;
  const prisma = new PrismaClient();

  try {
    const position = await prisma.cargo.findUnique({
      where: {
        id_cargo,
      },
    });

    if (!position) {
      throw new Error(error as unknown as string);
    }

    return NextResponse.json(position);
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

export async function PUT(request: { json: () => Position }, { params }: any) {
  const id_cargo = +params.id;
  const prisma = new PrismaClient();

  try {
    const positionExist = await prisma.cargo.findUnique({
      where: {
        id_cargo,
      },
    });

    if (!positionExist) {
      console.error("Error searching position:", error);
      return NextResponse.json(
        {
          message: "Error searching position",
        },
        { status: 404 }
      );
    }

    const data = await request.json();
    const { name } = data;

    const positionUpdate = await prisma.cargo.update({
      where: {
        id_cargo,
      },
      data: {
        name,
      },
    });

    return NextResponse.json(positionUpdate);
  } catch (error) {
    console.error("Error updating position:", error);

    return {
      status: 500,
      body: {
        message: "Error updating position",
      },
    };
  } finally {
    await prisma.$disconnect();
  }
}
