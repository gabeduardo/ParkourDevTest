"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";
import { type Record, CompleteRecord } from "@/lib/db/schema/records";
import Modal from "@/components/shared/Modal";

import { useOptimisticRecords } from "@/app/(app)/records/useOptimisticRecords";
import { Button } from "@/components/ui/button";
import RecordForm from "./RecordForm";
import { PlusIcon } from "lucide-react";
import { RecordTable } from "./RecordTable";

type TOpenModal = (record?: Record) => void;

export default function RecordList({ records }: { records: CompleteRecord[] }) {
  const { optimisticRecords, addOptimisticRecord } =
    useOptimisticRecords(records);
  const [open, setOpen] = useState(false);
  const [activeRecord, setActiveRecord] = useState<Record | null>(null);
  const openModal = (record?: Record) => {
    setOpen(true);
    record ? setActiveRecord(record) : setActiveRecord(null);
  };
  const closeModal = () => setOpen(false);
  Record;
  const newRecords = records.map(({ salario, ...record }) => ({
    ...record,
    salario: salario?.toString() ?? "",
  }));

  return (
    <div>
      <Modal
        open={open}
        setOpen={setOpen}
        title={activeRecord ? "Edit Record" : "Create Record"}
      >
        <RecordForm
          record={activeRecord}
          addOptimistic={addOptimisticRecord}
          openModal={openModal}
          closeModal={closeModal}
        />
      </Modal>
      <div className="w-full">
        <div className="absolute right-0 top-0 ">
          <Button onClick={() => openModal()} variant={"outline"}>
            +
          </Button>
        </div>
        {optimisticRecords.length === 0 ? (
          <EmptyState openModal={openModal} />
        ) : (
          <>
            <RecordTable records={newRecords} />
          </>
        )}
      </div>
    </div>
  );
}

const Record = ({
  record,
  openModal,
}: {
  record: CompleteRecord;
  openModal: TOpenModal;
}) => {
  const optimistic = record.id === "optimistic";
  const deleting = record.id === "delete";
  const mutating = optimistic || deleting;
  const pathname = usePathname();
  const basePath = pathname.includes("records")
    ? pathname
    : pathname + "/records/";

  return (
    <li
      className={cn(
        "flex justify-between my-2",
        mutating ? "opacity-30 animate-pulse" : "",
        deleting ? "text-destructive" : ""
      )}
    >
      <div className="w-full">
        <div>{record.nombre}</div>
      </div>
      <Button variant={"link"} asChild>
        <Link href={basePath + "/" + record.id}>Edit</Link>
      </Button>
    </li>
  );
};

const EmptyState = ({ openModal }: { openModal: TOpenModal }) => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No records
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new record.
      </p>
      <div className="mt-6">
        <Button onClick={() => openModal()}>
          <PlusIcon className="h-4" /> New Records{" "}
        </Button>
      </div>
    </div>
  );
};
