"use server";
import { JobApp } from "@/lib/data/models";
import { createSchema } from "@/lib/zodSchemas/createSchema";
import { db } from "@/server/db/db";
import { jobs } from "@/server/db/schema";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

export async function createJob(formData: JobApp) {
  try {
    const { userId } = await auth();
    const parse = createSchema.safeParse({ ...formData });

    if (!userId) {
      console.error("error retrieving user data");
      throw new Error("User not found")
    }
    if (!parse.data) {
      console.error("error retrieving data")
      throw Error("Error retrieving data")
    }
    
    await db.insert(jobs).values({
      ...parse.data as JobApp,
      userId: userId,
      updatedAt: null,
    });
  } catch (err: any) {
    console.error(err);
    throw Error("Error creating job: ", err)
  }

  revalidatePath("/dashboard");
}
