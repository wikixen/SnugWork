"use server";
import { JobApp } from "@/lib/data/models";
import { formSchema } from "@/lib/zodSchema";
import { db } from "@/server/db/db";
import { jobs } from "@/server/db/schema";

export async function createJob(formData: JobApp) {
  const parse = formSchema.safeParse({ ...formData });
  try {
    await db.insert(jobs).values({ ...parse.data as JobApp });
  } catch (e) {
    console.error(e);
  }
}
