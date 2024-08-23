import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { db } from "@/lib/db/index";

export async function POST(request: Request) {
  try {
    const data = await request.json();

    // Verificar que el campo password no sea null o esté vacío
    if (!data.password || data.password.trim() === "") {
      return NextResponse.json(
        {
          message: "Password cannot be empty",
        },
        {
          status: 400,
        }
      );
    }

    const userFound = await db.user.findUnique({
      where: {
        email: data.email,
      },
    });

    if (userFound) {
      return NextResponse.json(
        {
          message: "Email already exists",
        },
        {
          status: 400,
        }
      );
    }

    const nameFound = await db.user.findUnique({
      where: {
        email: data.email,
      },
    });

    if (nameFound) {
      return NextResponse.json(
        {
          message: "name already exists",
        },
        {
          status: 400,
        }
      );
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);
    const newUser = await db.user.create({
      data: {
        name: data.username,
        email: data.email,
        password: hashedPassword,
      },
    });

    const { password: _, ...user } = newUser;

    return NextResponse.json(user);
  } catch (error) {
        if (error instanceof Error) {
        return NextResponse.json(
            {
            message: error.message,
            },
            {
            status: 500,
            }
        );
        } else {
        return NextResponse.json(
            {
            message: "An unexpected error occurred",
            },
            {
            status: 500,
            }
        );
        }
    }
}
