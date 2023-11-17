import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { Role } from "@/interfaces/employee/Role.interface";
import { error } from "console";

export async function DELETE(request: any, { params }: any) {
  const id_role = +params.id;
  const prisma = new PrismaClient();

  try {
    const role = await prisma.role.findUnique({
      where: {
        id_role,
      },
    });

    if (!role) {
      throw new Error(error as unknown as string);
    } else {
      const roleDelete = await prisma.role.delete({
        where: {
          id_role,
        },
      });
      return NextResponse.json(roleDelete);
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

export async function GET(request: any, { params }: any) {
  const id_role = +params.id;
  const prisma = new PrismaClient();

  try {
    const role = await prisma.role.findUnique({
      where: {
        id_role,
      },
    });

    if (!role) {
      throw new Error(error as unknown as string);
    }

    return NextResponse.json(role);
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

export async function PUT(request: { json: () => Role }, { params }: any) {
  const id_role = +params.id;
  const prisma = new PrismaClient();

  try {
    const roleExist = await prisma.role.findUnique({
      where: {
        id_role,
      },
    });

    if (!roleExist) {
      console.error("Error searching role:", error);
      return NextResponse.json(
        {
          message: "Error searching role",
        },
        { status: 404 }
      );
    }

    const data = await request.json();
    const { name } = data;

    const roleUpdate = await prisma.role.update({
      where: {
        id_role,
      },
      data: {
        name,
      },
    });

    return NextResponse.json(roleUpdate);
  } catch (error) {
    console.error("Error updating role:", error);

    return {
      status: 500,
      body: {
        message: "Error updating role",
      },
    };
  } finally {
    await prisma.$disconnect();
  }
}
