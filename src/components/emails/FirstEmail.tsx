import * as React from "react";

interface EmailTemplateProps {
  firstName: string;
  verificationUrl: string;
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  firstName,
  verificationUrl,
}) => (
  <div>
    <h1>Bienvenido, {firstName}!</h1>

    <p>
      Por favor, verifica tu correo electrónico haciendo clic en el siguiente
      enlace:
      <a href={verificationUrl}>Verificar correo electrónico</a>
    </p>
    <hr />
    <p>Sent with help from Resend and Kirimase 😊</p>
  </div>
);
