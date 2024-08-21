import { db } from "@/lib/db/index";
import { 
  RecordId, 
  NewRecordParams,
  UpdateRecordParams, 
  updateRecordSchema,
  insertRecordSchema, 
  recordIdSchema 
} from "@/lib/db/schema/records";
import { getUserAuth } from "@/lib/auth/utils";

export const createRecord = async (record: NewRecordParams) => {
  const { session } = await getUserAuth();
  const newRecord = insertRecordSchema.parse({ ...record, userId: session?.user.id! });
  try {
    const r = await db.record.create({ data: newRecord });
    return { record: r };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateRecord = async (id: RecordId, record: UpdateRecordParams) => {
  const { session } = await getUserAuth();
  const { id: recordId } = recordIdSchema.parse({ id });
  const newRecord = updateRecordSchema.parse({ ...record, userId: session?.user.id! });
  try {
    const r = await db.record.update({ where: { id: recordId, userId: session?.user.id! }, data: newRecord})
    return { record: r };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteRecord = async (id: RecordId) => {
  const { session } = await getUserAuth();
  const { id: recordId } = recordIdSchema.parse({ id });
  try {
    const r = await db.record.delete({ where: { id: recordId, userId: session?.user.id! }})
    return { record: r };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

