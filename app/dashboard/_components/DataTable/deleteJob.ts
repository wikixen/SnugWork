"use server";
import { db } from "@/server/db/db";
import { jobs } from "@/server/db/schema";
import { auth } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function deleteJob(id: number) {
  const { userId } = await auth();
  
  if (userId) {
    try {
      await db
        .delete(jobs)
        .where(eq(jobs.id, id));
    } catch (e) {
      console.error(e);
    }
  } else {
    console.error("error deleting data")
  }

  revalidatePath("/dashboard");
}
