"use client";

import { useOptimistic, useState } from "react";
import { TAddOptimistic } from "@/app/(app)/records/useOptimisticRecords";
import { type Record } from "@/lib/db/schema/records";
import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import Modal from "@/components/shared/Modal";
import RecordForm from "@/components/records/RecordForm";


export default function OptimisticRecord({ 
  record,
   
}: { 
  record: Record; 
  
  
}) {
  const [open, setOpen] = useState(false);
  const openModal = (_?: Record) => {
    setOpen(true);
  };
  const closeModal = () => setOpen(false);
  const [optimisticRecord, setOptimisticRecord] = useOptimistic(record);
  const updateRecord: TAddOptimistic = (input) =>
    setOptimisticRecord({ ...input.data });

  return (
    <div className="m-4">
      <Modal open={open} setOpen={setOpen}>
        <RecordForm
          record={optimisticRecord}
          
          closeModal={closeModal}
          openModal={openModal}
          addOptimistic={updateRecord}
        />
      </Modal>
      <div className="flex justify-between items-end mb-4">
        <h1 className="font-semibold text-2xl">{optimisticRecord.nombre}</h1>
        <Button className="" onClick={() => setOpen(true)}>
          Edit
        </Button>
      </div>
      <pre
        className={cn(
          "bg-secondary p-4 rounded-lg break-all text-wrap",
          optimisticRecord.id === "optimistic" ? "animate-pulse" : "",
        )}
      >
        {JSON.stringify(optimisticRecord, null, 2)}
      </pre>
    </div>
  );
}
