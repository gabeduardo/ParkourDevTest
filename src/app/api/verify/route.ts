import { NextApiRequest, NextApiResponse } from 'next';
import { verify } from 'jsonwebtoken';
import { db } from "@/lib/db/index";
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  console.log('verificando', req.url);
  
  const url = new URL(req.url, `http://${req.headers.host}`);
  const token = url.searchParams.get('token');
  // console.log('TOKENSITO', tokensito)
  // if (!req.query) {
  //   return res.send('Falta el token en la solicitud');
  // }
  console.log('EL TOKEN ES', token)
  // const { token } = req.query;

  try {
    const { userId } = verify(token as string, 'tu_secreto');
    console.log("VERIFICANDO EL METODO DE VERIFICACION", userId);
    await db.user.update({
      where: { id: userId },
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
