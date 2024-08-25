import { EmailTemplate } from "@/components/emails/FirstEmail";
import { resend } from "@/lib/email/index";
import { emailSchema } from "@/lib/email/utils";
import { NextResponse } from "next/server";
import { generateVerificationUrl } from "@/lib/authUtils";

export async function POST(request: Request) {

  const body = await request.json();
  const { name, email, userId } = emailSchema.parse(body); 
  console.log('CORREO DEL USUARIO',email)
  const verificationUrl = generateVerificationUrl(userId);
  console.log('url de verificacion', verificationUrl)
  try {
    const data = await resend.emails.send({
      from: "Gabriel <onboarding@resend.dev>",
      to: [email],
      subject: "Verifica tu correo electrónico",
      react: EmailTemplate({ firstName: name, verificationUrl }),
      text: `Por favor, verifica tu correo electrónico haciendo clic en el siguiente enlace: ${verificationUrl}`,
    });
    console.log('DATA', data)
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error });
  }
}
