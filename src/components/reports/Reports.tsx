import { createSalaryReport } from "@/lib/api/records/queries";
import { CardSalary } from "./CardSalary";
import { TableSalary } from "./TableSalary";

export const Reports = async ({ n }: { n: number }) => {
  const { records, averageSalary } = await createSalaryReport(n);

  return (
    <div>
      <CardSalary averageSalary={averageSalary} />
      <h4 className="text-xl font-semibold tracking-tight pt-10">
        Mejores {n} Salarios
      </h4>
      <TableSalary records={records} />
    </div>
  );
};
