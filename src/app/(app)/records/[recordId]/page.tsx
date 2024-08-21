import { Suspense } from "react";
import { notFound } from "next/navigation";

import { getRecordById } from "@/lib/api/records/queries";
import OptimisticRecord from "./OptimisticRecord";
import { checkAuth } from "@/lib/auth/utils";


import { BackButton } from "@/components/shared/BackButton";
import Loading from "@/app/loading";


export const revalidate = 0;

export default async function RecordPage({
  params,
}: {
  params: { recordId: string };
}) {

  return (
    <main className="overflow-auto">
      <Record id={params.recordId} />
    </main>
  );
}

const Record = async ({ id }: { id: string }) => {
  await checkAuth();

  const { record } = await getRecordById(id);
  

  if (!record) notFound();
  return (
    <Suspense fallback={<Loading />}>
      <div className="relative">
        <BackButton currentResource="records" />
        <OptimisticRecord record={record}  />
      </div>
    </Suspense>
  );
};
