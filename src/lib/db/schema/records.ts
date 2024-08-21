import { recordSchema } from "@/zodAutoGenSchemas";
import { z } from "zod";
import { getRecords } from "@/lib/api/records/queries";


// Schema for records - used to validate API requests
const baseSchema = recordSchema

export const insertRecordSchema = baseSchema.omit({ id: true });
export const insertRecordParams = baseSchema.extend({
  salario: z.coerce.number()
}).omit({ 
  id: true,
  userId: true
});

export const updateRecordSchema = baseSchema;
export const updateRecordParams = updateRecordSchema.extend({
  salario: z.coerce.number()
}).omit({ 
  userId: true
});
export const recordIdSchema = baseSchema.pick({ id: true });

// Types for records - used to type API request params and within Components
export type Record = z.infer<typeof recordSchema>;
export type NewRecord = z.infer<typeof insertRecordSchema>;
export type NewRecordParams = z.infer<typeof insertRecordParams>;
export type UpdateRecordParams = z.infer<typeof updateRecordParams>;
export type RecordId = z.infer<typeof recordIdSchema>["id"];
    
// this type infers the return from getRecords() - meaning it will include any joins
export type CompleteRecord = Awaited<ReturnType<typeof getRecords>>["records"][number];

