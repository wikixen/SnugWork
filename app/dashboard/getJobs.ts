"use server";
import { JobApp } from "@/lib/data/models";
import { db } from "@/server/db/db";
import { jobs } from "@/server/db/schema";
import { auth } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";

export async function getJobs() {
  const { userId } = await auth();
  
  if (userId) {
    try {
      return await db.query.jobs.findMany({
        orderBy: [jobs.dateApplied],
        where: (eq(jobs.userId, userId))
      }) as JobApp[];
    } catch (e) {
      console.error(e);
    }
  } else {
    console.error("error retrieving user data")
    return [];
  }
}
