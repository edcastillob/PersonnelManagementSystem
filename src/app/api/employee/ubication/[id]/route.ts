import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { Ubication } from "@/interfaces/employee/Ubication.interface";
import { error } from "console";

export async function DELETE(request: any, { params }: any) {
  const id_ubication = +params.id;
  const prisma = new PrismaClient();

  try {
    const ubication = await prisma.ubication.findUnique({
      where: {
        id_ubication,
      },
    });

    if (!ubication) {
      throw new Error(error as unknown as string);
    } else {
      const ubicationDelete = await prisma.ubication.delete({
        where: {
          id_ubication,
        },
      });
      return NextResponse.json(ubicationDelete);
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

export async function GET(request: any, { params }: any) {
  const id_ubication = +params.id;
  const prisma = new PrismaClient();

  try {
    const ubication = await prisma.ubication.findUnique({
      where: {
        id_ubication,
      },
    });

    if (!ubication) {
      throw new Error(error as unknown as string);
    }

    return NextResponse.json(ubication);
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

export async function PUT(request: { json: () => Ubication }, { params }: any) {
  const id_ubication = +params.id;
  const prisma = new PrismaClient();

  try {
    const ubicationExist = await prisma.ubication.findUnique({
      where: {
        id_ubication,
      },
    });

    if (!ubicationExist) {
      console.error("Error searching ubication:", error);
      return NextResponse.json(
        {
          message: "Error searching ubication",
        },
        { status: 404 }
      );
    }

    const data = await request.json();
    const { name } = data;

    const ubicationUpdate = await prisma.ubication.update({
      where: {
        id_ubication,
      },
      data: {
        name,
      },
    });

    return NextResponse.json(ubicationUpdate);
  } catch (error) {
    console.error("Error updating ubication:", error);

    return {
      status: 500,
      body: {
        message: "Error updating ubication",
      },
    };
  } finally {
    await prisma.$disconnect();
  }
}
