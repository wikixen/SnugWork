"use server";
import { JobApp } from "@/lib/data/models";
import { db } from "@/server/db/db";
import { jobs } from "@/server/db/schema";

export async function getJobs() {
  let data: JobApp[];
  try {
    data = await db.query.jobs.findMany({
      orderBy: [jobs.dateApplied],
    }) as JobApp[];
  } catch (e) {
    console.error(e);
    data = [];
  }

  return data;
}
