import {
  integer,
  pgTable,
  serial,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

export const usersTable = pgTable("users", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull().unique(),
});

export const jobsTable = pgTable("jobs", {
  id: serial("id").primaryKey(),
  userId: integer("user_id")
    .notNull()
    .references(() => usersTable.id),
  company: varchar({ length: 255 }).notNull(),
  location: varchar({ length: 255 }).notNull(),
  position: varchar({ length: 255 }).notNull(),
  appStatus: varchar({ length: 255 }).notNull(),
  dateApplied: timestamp("dateApplied").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at")
    .notNull()
    .$onUpdate(() => new Date()),
});

export type InsertUser = typeof usersTable.$inferInsert;
export type SelectUser = typeof usersTable.$inferSelect;

export type InsertJob = typeof jobsTable.$inferInsert;
export type SelectJob = typeof jobsTable.$inferSelect;
