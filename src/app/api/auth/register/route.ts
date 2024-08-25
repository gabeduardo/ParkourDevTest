import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { db } from "@/lib/db/index";

import { sign } from 'jsonwebtoken';
export async function POST(request: Request) {
  try {
    const data = await request.json();

    // Verificar que el campo password no sea null o esté vacío
    if (!data.password || data.password.trim() === "") {
      return NextResponse.json(
        {
          message: "El campo ontraseña es requerido",
        },
        {
          status: 400,
        }
      );
    }

    const emailFound = await db.user.findUnique({
      where: {
        email: data.email,
      },
    });

    if (emailFound) {
      return NextResponse.json(
        {
          message: "Este correo ya se encuentra en uso",
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



function generateVerificationUrl(userId: string) {
  const token = sign({ userId }, 'tu_secreto', { expiresIn: '8h' });
  return `http://localhost:3000/api/verify?token=${token}`;
}

export { generateVerificationUrl };


