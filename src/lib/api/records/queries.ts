import { db } from "@/lib/db/index";
import { getUserAuth } from "@/lib/auth/utils";
import { type RecordId, recordIdSchema, Record } from "@/lib/db/schema/records";

export const getRecords = async () => {
  const { session } = await getUserAuth();
  const r = await db.record.findMany({ where: {userId: session?.user.id!}});
  return { records: r };
};

export const getRecordById = async (id: RecordId) => {
  const { session } = await getUserAuth();
  const { id: recordId } = recordIdSchema.parse({ id });
  const r = await db.record.findFirst({
    where: { id: recordId, userId: session?.user.id!}});
  return { record: r };
};
// metodo apra el salario promedio
export const calculateAverageSalary = (records: Record[]) => {
  const totalSalary = records.reduce((sum, record) => sum + (record.salario || 0), 0);
  return totalSalary / records.length;
};

// Función que me genera los reportes 
export const createSalaryReport = async (n: number) => {
  const { records } = await getRecords();
  const averageSalary = calculateAverageSalary(records);

  // Ordena registros y slice para ordenarlo por mejor salario 
  const topNSalaries = records.sort((a, b) => (b.salario ?? 0) - (a.salario ?? 0)).slice(0, n);

  return {
    averageSalary,
    records: topNSalaries,
  };
};