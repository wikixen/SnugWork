"use server";
import { JobApp } from "@/lib/data/models";
import { editSchema } from "@/lib/zodSchemas/editSchema";
import { db } from "@/server/db/db";
import { jobs } from "@/server/db/schema";
import { revalidatePath } from "next/cache";

export async function editJob(formData: JobApp) {
  const parse = editSchema.safeParse({ ...formData });

  try {
    await db.update(jobs).set({
      ...parse.data,
      updatedAt: new Date(Date.now()),
      createdAt: jobs.createdAt,
    });
  } catch (e) {
    console.error(e);
  }
  revalidatePath("/dashboard");
}
