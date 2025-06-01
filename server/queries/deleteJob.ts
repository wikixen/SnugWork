"use server";
import { db } from "@/server/db/db";
import { jobs } from "@/server/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function deleteJob(id: number) {
  try {
    await db.delete(jobs).where(eq(jobs.id, id));
  } catch (e) {
    console.error(e);
  }
  revalidatePath("/dashboard");
}
