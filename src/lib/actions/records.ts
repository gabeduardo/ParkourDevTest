"use server";

import { revalidatePath } from "next/cache";
import {
  createRecord,
  deleteRecord,
  updateRecord,
} from "@/lib/api/records/mutations";
import {
  RecordId,
  NewRecordParams,
  UpdateRecordParams,
  recordIdSchema,
  insertRecordParams,
  updateRecordParams,
} from "@/lib/db/schema/records";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateRecords = () => revalidatePath("/records");

export const createRecordAction = async (input: NewRecordParams) => {
  try {
    const payload = insertRecordParams.parse(input);
    await createRecord(payload);
    revalidateRecords();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateRecordAction = async (input: UpdateRecordParams) => {
  try {
    const payload = updateRecordParams.parse(input);
    await updateRecord(payload.id, payload);
    revalidateRecords();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteRecordAction = async (input: RecordId) => {
  try {
    const payload = recordIdSchema.parse({ id: input });
    await deleteRecord(payload.id);
    revalidateRecords();
  } catch (e) {
    return handleErrors(e);
  }
};