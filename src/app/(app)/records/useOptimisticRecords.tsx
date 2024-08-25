import { type Record, type CompleteRecord } from "@/lib/db/schema/records";
import { OptimisticAction } from "@/lib/utils";
import { useOptimistic } from "react";

export type TAddOptimistic = (action: OptimisticAction<Record>) => void;

export const useOptimisticRecords = (records: CompleteRecord[]) => {
  const [optimisticRecords, addOptimisticRecord] = useOptimistic(
    records,
    (
      currentState: CompleteRecord[],
      action: OptimisticAction<Record>
    ): CompleteRecord[] => {
      const { data } = action;

      const optimisticRecord: any = {
        ...data,

        id: "optimistic",
      };

      switch (action.action) {
        case "create":
          return currentState.length === 0
            ? [optimisticRecord]
            : [...currentState, optimisticRecord];
        case "update":
          return currentState.map((item) =>
            item.id === data.id ? { ...item, ...optimisticRecord } : item
          );
        case "delete":
          return currentState.map((item) =>
            item.id === data.id ? { ...item, id: "delete" } : item
          );
        default:
          return currentState;
      }
    }
  );

  return { addOptimisticRecord, optimisticRecords };
};
