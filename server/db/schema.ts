import {
  date,
  pgEnum,
  pgTable,
  serial,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

export const statusEnum = pgEnum("appStatus", [
  "Applied",
  "Interview",
  "Offer",
  "Rejected",
]);

export const jobsTable = pgTable("jobs", {
  id: serial("id").primaryKey(),
  userId: varchar("user_id", { length: 255 }).notNull(),
  company: varchar({ length: 255 }).notNull(),
  location: varchar({ length: 255 }).notNull(),
  position: varchar({ length: 255 }).notNull(),
  appStatus: statusEnum()
    .notNull()
    .default("Applied"),
  dateApplied: date("dateApplied", { mode: "date" }) // Might change this to a date string
    .notNull()
    .defaultNow(),
  createdAt: timestamp("created_at")
    .notNull()
    .defaultNow(),
  updatedAt: timestamp("updated_at").$onUpdate(() => new Date()),
});

export type InsertJob = typeof jobsTable.$inferInsert;
export type SelectJob = typeof jobsTable.$inferSelect;
