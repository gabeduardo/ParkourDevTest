import { db } from "@/lib/db/index";
import { getUserAuth } from "@/lib/auth/utils";
import { type RecordId, recordIdSchema } from "@/lib/db/schema/records";

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
export const calculateAverageSalary = (records) => {
  const totalSalary = records.reduce((sum, record) => sum + (record.salario || 0), 0);
  return totalSalary / records.length;
};

// Función que me genera los reportes 
export const createSalaryReport = async (n) => {
  const { records } = await getRecords();
  const averageSalary = calculateAverageSalary(records);

  // Ordena registros y slice para ordenarlo por mejor salario 
  const topNSalaries = records.sort((a, b) => b.salario - a.salario).slice(0, n);

  return {
    averageSalary,
    records: topNSalaries,
  };
};


// // consulta y llamaod de la fcion 
// createSalaryReport().then(report => {
//   console.log("Salario promedio:", report.averageSalary);
//   console.log("Registros:", report.records);
// }).catch(error => {
//   console.error("Error al crear el reporte:", error);
// });