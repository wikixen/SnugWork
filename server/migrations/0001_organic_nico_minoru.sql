CREATE TYPE "public"."appStatus" AS ENUM('Applied', 'Interview', 'Offer', 'Rejected');--> statement-breakpoint
ALTER TABLE "jobs" ALTER COLUMN "appStatus" SET DEFAULT 'Applied'::"public"."appStatus";--> statement-breakpoint
ALTER TABLE "jobs" ALTER COLUMN "appStatus" SET DATA TYPE "public"."appStatus" USING "appStatus"::"public"."appStatus";--> statement-breakpoint
ALTER TABLE "jobs" ALTER COLUMN "dateApplied" SET DATA TYPE date;--> statement-breakpoint
ALTER TABLE "jobs" ALTER COLUMN "dateApplied" SET DEFAULT now();