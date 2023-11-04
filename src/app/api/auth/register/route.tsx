import { RegistrationData } from "@/interfaces/users/User.interface";
import { NextResponse } from "next/server";
import db from "@/libs/db";
import bcrypt from "bcrypt";

export async function POST(request: { json: () => Promise<RegistrationData> }) {
  try {
    const data = await request.json();

    const userEmailFound = await db.user.findUnique({
      where: {
        email: data.email,
      },
    });

    if (userEmailFound) {
      return NextResponse.json(
        {
          message: "Email already exists",
        },
        {
          status: 400,
        }
      );
    }
    const userNameFound = await db.user.findUnique({
      where: {
        username: data.username,
      },
    });

    if (userNameFound) {
      return NextResponse.json(
        {
          message: "Username already exists",
        },
        {
          status: 400,
        }
      );
    }

    const passwCrypt = await bcrypt.hash(data.password, 10);
    const newUser = await db.user.create({
      data: {
        username: data.username,
        email: data.email,
        password: passwCrypt,
        updatedAt: new Date(),
      },
    });

    const { password: _, ...user } = newUser;
    return NextResponse.json(user);
  } catch (error: any) {
    return NextResponse.json(
      {
        message: error.message,
      },
      { status: 500 }
    );
  }
}
