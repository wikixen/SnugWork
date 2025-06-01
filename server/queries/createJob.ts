"use server";
import { JobApp } from "@/lib/data/models";
import { createSchema } from "@/lib/zodSchemas/createSchema";
import { db } from "@/server/db/db";
import { jobs } from "@/server/db/schema";
import { revalidatePath } from "next/cache";

export async function createJob(formData: JobApp) {
  const parse = createSchema.safeParse({ ...formData });
  try {
    await db.insert(jobs).values({ ...parse.data as JobApp });
  } catch (e) {
    console.error(e);
  }
  revalidatePath("/dashboard");
}
