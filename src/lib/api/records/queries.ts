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


