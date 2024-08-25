import { JwtPayload, verify } from 'jsonwebtoken';
import { db } from "@/lib/db/index";
import { NextResponse } from 'next/server';

interface CustomJwtPayload extends JwtPayload {
  userId: string;
}

export async function GET(req: Request) {
  const host = req.headers.get('host');
  const url = new URL(req.url, `http://${host}`);  
  const token = url.searchParams.get('token');
  try {
    const decoded = verify(token as string, 'tu_secreto') as CustomJwtPayload;
    await db.user.update({
      where: { id: decoded.userId },
      data: { emailVerified: new Date() },
    });
    return NextResponse.redirect(new URL('/dashboard', req.url));
  } catch (error) {
    return NextResponse.json(
      {
        message: "error en la verificacion",
      },
      {
        status: 400,
      }
    );
  }
}
