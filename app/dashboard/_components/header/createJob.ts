"use server";
import { JobApp } from "@/lib/data/models";
import { createSchema } from "@/lib/zodSchemas/createSchema";
import { db } from "@/server/db/db";
import { jobs } from "@/server/db/schema";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

export async function createJob(formData: JobApp) {
  const { userId } = await auth();
  const parse = createSchema.safeParse({ ...formData });

  if (userId) {
    try {
      await db.insert(jobs).values({
        ...parse.data as JobApp,
        userId: userId,
        updatedAt: null,
      });
    } catch (e) {
      console.error(e);
    }
  } else {
    console.error("user not authenticated");
  }
  revalidatePath("/dashboard");
}
