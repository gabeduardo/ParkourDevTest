import { Suspense } from "react";
import Loading from "@/app/loading";
import { checkAuth } from "@/lib/auth/utils";
import { Reports } from "@/components/reports/Reports";
import MainContainerApp from "../MainContainerApp";

export default async function ReportsPage() {
  await checkAuth();
  return (
    <MainContainerApp title="Reports">
      <Suspense fallback={<Loading />}>
        <Reports n={5} />
      </Suspense>
    </MainContainerApp>
  );
}
