import { Suspense } from "react";
import Loading from "@/app/loading";
import { createSalaryReport } from "@/lib/api/records/queries";
import { checkAuth } from "@/lib/auth/utils";

export const revalidate = 0;

export default async function ReportsPage() {
  return (
    <main>
      <div className="relative">
        <div className="flex justify-between">
          <h1 className="font-semibold text-2xl my-2">Reports</h1>
          <Suspense fallback={<Loading />}>
            <Reports n={5} /> {/* Cambia el valor de n según lo necesites */}
          </Suspense>
        </div>
      </div>
    </main>
  );
}

const Reports = async ({ n }) => {
  await checkAuth();

  const { records, averageSalary } = await createSalaryReport(n);

  return (
    <div>
      <h2>Salario promedio: {averageSalary}</h2>
      <h3>Mejores {n} salarios:</h3>
      <ul>
        {records.map((record, index) => (
          <li key={index}>
            {record.nombre}: {record.salario}
          </li>
        ))}
      </ul>
    </div>
  );
};
