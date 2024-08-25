"use client";

import FormWrapper from "@/components/shared/FormWrapper";
import MainContainer from "@/components/MainContainer";
import { signIn } from "next-auth/react";

const Login = () => {
  return (
    <MainContainer>
      <FormWrapper title="login_action">
        <button
          className="w-full md:w-auto px-6 bg-blue-500 text-white p-3 rounded-lg mt-2"
          onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
        >
          Iniciar Sesión
        </button>
      </FormWrapper>
    </MainContainer>
  );
};

export default Login;
