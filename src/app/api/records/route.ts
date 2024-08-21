import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

import {
  createRecord,
  deleteRecord,
  updateRecord,
} from "@/lib/api/records/mutations";
import { 
  recordIdSchema,
  insertRecordParams,
  updateRecordParams 
} from "@/lib/db/schema/records";

export async function POST(req: Request) {
  try {
    const validatedData = insertRecordParams.parse(await req.json());
    const { record } = await createRecord(validatedData);

    revalidatePath("/records"); // optional - assumes you will have named route same as entity

    return NextResponse.json(record, { status: 201 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    } else {
      return NextResponse.json({ error: err }, { status: 500 });
    }
  }
}


export async function PUT(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    const validatedData = updateRecordParams.parse(await req.json());
    const validatedParams = recordIdSchema.parse({ id });

    const { record } = await updateRecord(validatedParams.id, validatedData);

    return NextResponse.json(record, { status: 200 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    } else {
      return NextResponse.json(err, { status: 500 });
    }
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    const validatedParams = recordIdSchema.parse({ id });
    const { record } = await deleteRecord(validatedParams.id);

    return NextResponse.json(record, { status: 200 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    } else {
      return NextResponse.json(err, { status: 500 });
    }
  }
}
