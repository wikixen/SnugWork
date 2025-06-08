"use server";
import { JobApp } from "@/lib/data/models";
import { editSchema } from "@/lib/zodSchemas/editSchema";
import { db } from "@/server/db/db";
import { jobs } from "@/server/db/schema";
import { auth } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function editJob(formData: JobApp) {
  const { userId } = await auth();
  const parse = editSchema.safeParse({ ...formData });

  try {
    if (!userId) {
      console.error("error retrieving user data");
      throw new Error("User not found");
    }
    if (!parse.data) {
      console.error("error retrieving data");
      throw Error("Error retrieving data");
    }

    await db.update(jobs).set({
      ...parse.data,
      userId: userId,
      updatedAt: new Date(Date.now()),
      createdAt: jobs.createdAt,
    }).where(eq(jobs.id, parse.data.id));
  } catch (err: any) {
    console.error(err);
    throw Error("Error editing data: ", err);
  }

  revalidatePath("/dashboard");
}
