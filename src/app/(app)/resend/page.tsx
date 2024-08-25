import { checkAuth } from "@/lib/auth/utils";
import MainContainerApp from "../MainContainerApp";
import ResendForm from "@/components/resend/ResendForm";

export default async function ResendEmail() {
  await checkAuth();
  return (
    <MainContainerApp title="Send Email with Resend">
      <ResendForm />
    </MainContainerApp>
  );
}
