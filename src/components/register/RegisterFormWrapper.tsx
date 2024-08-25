"use client";
import RegisterForm from "@/components/register/RegisterForm";
import FormWrapper from "../shared/FormWrapper";

const RegisterFormWrapper = () => {
  return (
    <FormWrapper title="register_action">
      <RegisterForm />
    </FormWrapper>
  );
};
export default RegisterFormWrapper;
