"use server";
import { JobApp } from "@/lib/data/models";
import { editSchema } from "@/lib/zodSchemas/editSchema";
import { db } from "@/server/db/db";
import { jobs } from "@/server/db/schema";
import { eq, sql } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function editJob(formData: JobApp) {
  const parse = editSchema.safeParse({ ...formData });
  console.log(parse);
  try {
    await db.update(jobs).set({
      ...parse.data,
      updatedAt: new Date(Date.now()),
    }).where(
      eq(jobs.id, parse.data?.id!),
    );
  } catch (e) {
    console.error(e);
  }
  revalidatePath("/dashboard");
}
