"use server";
import { db } from "@/server/db/db";
import { jobs } from "@/server/db/schema";
import { auth } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function deleteJob(id: number) {
  const { userId } = await auth();
  
  try {
    if (!userId) {
      console.error("error retrieving user data");
      throw new Error("User not found");
    }

    await db
      .delete(jobs)
      .where(eq(jobs.id, id));
  } catch (err: any) {
    console.error(err);
    throw Error("Error creating job: ", err);
  }

  revalidatePath("/dashboard");
}
