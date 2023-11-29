import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import  Benefit  from "@/interfaces/employee/Benefit.interface";
import { error } from "console";

export async function DELETE(request: any, { params }: any) {
  const id_benefit = +params.id;
  const prisma = new PrismaClient();

  try {
    const benefit = await prisma.benefit.findUnique({
      where: {
        id_benefit,
      },
    });

    if (!benefit) {
      throw new Error(error as unknown as string);
    } else {
      const benefitDelete = await prisma.benefit.delete({
        where: {
          id_benefit,
        },
      });
      return NextResponse.json(benefitDelete);
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

export async function GET(request: any, { params }: any) {
  const id_benefit = +params.id;
  const prisma = new PrismaClient();

  try {
    const benefit = await prisma.benefit.findUnique({
      where: {
        id_benefit,
      },
    });

    if (!benefit) {
      throw new Error(error as unknown as string);
    }

    return NextResponse.json(benefit);
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

export async function PUT(request: { json: () => Benefit }, { params }: any) {
  const id_benefit = +params.id;
  const prisma = new PrismaClient();

  try {
    const benefitExist = await prisma.benefit.findUnique({
      where: {
        id_benefit,
      },
    });

    if (!benefitExist) {
      console.error("Error searching benefit:", error);
      return NextResponse.json(
        {
          message: "Error searching benefit",
        },
        { status: 404 }
      );
    }

    const data = await request.json();
    const { name } = data;

    const benefitUpdate = await prisma.benefit.update({
      where: {
        id_benefit,
      },
      data: {
        name,
      },
    });

    return NextResponse.json(benefitUpdate);
  } catch (error) {
    console.error("Error updating benefit:", error);

    return {
      status: 500,
      body: {
        message: "Error updating benefit",
      },
    };
  } finally {
    await prisma.$disconnect();
  }
}
