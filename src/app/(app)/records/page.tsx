import { Suspense } from "react";

import Loading from "@/app/loading";
import RecordList from "@/components/records/RecordList";
import { getRecords } from "@/lib/api/records/queries";

import { checkAuth } from "@/lib/auth/utils";
import MainContainerApp from "../MainContainerApp";

export const revalidate = 0;

export default async function RecordsPage() {
  await checkAuth();

  const { records } = await getRecords();
  return (
    <MainContainerApp title="Records">
      <Suspense fallback={<Loading />}>
        <RecordList records={records} />
      </Suspense>
    </MainContainerApp>
  );
}
