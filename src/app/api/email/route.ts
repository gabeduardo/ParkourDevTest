import { EmailTemplate } from "@/components/emails/FirstEmail";
import { resend } from "@/lib/email/index";
import { emailSchema } from "@/lib/email/utils";
import { NextResponse } from "next/server";
import { generateVerificationUrl } from "@/lib/authUtils";

export async function POST(request: Request) {
  const body = await request.json();
  const { name, email, userId } = emailSchema.parse(body);
  const host = request.headers.get('host') ?? "";
  const verificationUrl = generateVerificationUrl(userId, host);
  try {
    const data = await resend.emails.send({
      from: "Gabriel <onboarding@resend.dev>",
      to: [email],
      subject: "Verifica tu correo electrónico",
      react: EmailTemplate({ firstName: name, verificationUrl }),
      text: `Por favor, verifica tu correo electrónico haciendo clic en el siguiente enlace: ${verificationUrl}`,
    });
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error });
  }
}
