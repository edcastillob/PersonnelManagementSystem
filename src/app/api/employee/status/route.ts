import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import  Status  from "@/interfaces/employee/Status.interface";
import { error } from "console";

// export async function POST(request: { json: () => Benefit }) {
//   const prisma = new PrismaClient();

//   try {
//     const data = await request.json();
//     const { name } = data;

//     if (!name) {
//       return NextResponse.json(
//         {
//           message: "empty benefit name",
//         },
//         { status: 400 }
//       );
//     }

//     const benefit = await prisma.benefit.create({
//       data: {
//         name,
//       },
//     });

//     return NextResponse.json({
//       message: "Benefit successfully registered",
//       benefit,
//     });
//   } catch (error) {
//     console.error("Error registering the benefit:", error);
//     return NextResponse.json(
//       {
//         message: "Error registering the benefit.",
//       },
//       { status: 500 }
//     );
//   } finally {
//     await prisma.$disconnect();
//   }
// }

export async function GET() {
  const prisma = new PrismaClient();

  try {
    const status = await prisma.status.findMany();
    if (!status) {
      throw new Error(error as unknown as string);
    } else {
      return NextResponse.json(status);
    }
  } catch (error) {
    console.error("Error searching status:", error);
    return NextResponse.json(
      {
        message: "Error searching status",
      },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
