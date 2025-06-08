"use server";
import { JobApp } from "@/lib/data/models";
import { db } from "@/server/db/db";
import { jobs } from "@/server/db/schema";
import { auth } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";

export async function getJobs() {
  const { userId } = await auth();

  try {
    if (!userId) {
      console.error("error retrieving user data");
      throw new Error("User not found");
    }

    return await db.query.jobs.findMany({
      orderBy: [jobs.updatedAt, jobs.createdAt],
      where: (eq(jobs.userId, userId)),
    }) as JobApp[];
  } catch (err: any) {
    console.error(err);
    throw new Error("Error fetching data: ", err);
  }
}
