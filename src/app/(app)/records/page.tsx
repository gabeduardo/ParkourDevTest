import { Suspense } from "react";

import Loading from "@/app/loading";
import RecordList from "@/components/records/RecordList";
import { getRecords } from "@/lib/api/records/queries";

import { checkAuth } from "@/lib/auth/utils";

export const revalidate = 0;

export default async function RecordsPage() {
  return (
    <main>
      <div className="relative">
        <div className="flex justify-between">
          <h1 className="font-semibold text-2xl my-2">Records</h1>
        </div>
        <Records />
      </div>
    </main>
  );
}

const Records = async () => {
  await checkAuth();

  const { records } = await getRecords();
  
  return (
    <Suspense fallback={<Loading />}>
      <RecordList records={records}  />
    </Suspense>
  );
};
