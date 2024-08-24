"use client";
import RegisterForm from "@/components/register/RegisterForm";
import { FormattedMessage } from "react-intl";

function RegisterPage() {
  return (
    <div className="h-[calc(100vh-7rem)] w-full grid place-items-center">
      <div className="rounded overflow-hidden shadow-lg w-full grid place-items-center max-w-lg p-10">
        <h1 className="text-slate-600 font-bold text-4xl mb-4 w-full text-center">
          <FormattedMessage id="register_action" />
        </h1>
        <RegisterForm />
      </div>
    </div>
  );
}
export default RegisterPage;
