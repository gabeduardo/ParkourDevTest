import { Suspense } from "react";
import Loading from "@/app/loading";
import { checkAuth } from "@/lib/auth/utils";
import { Reports } from "@/components/reports/Reports";

export const revalidate = 0;

export default async function ReportsPage() {
  await checkAuth();
  return (
    <main>
      <div className="relative">
        <div>
          <h1 className="font-semibold text-2xl my-2">Reports</h1>
          <div className="py-8">
            <Suspense fallback={<Loading />}>
              <Reports n={5} />
            </Suspense>
          </div>
        </div>
      </div>
    </main>
  );
}
