import { sql } from "drizzle-orm";
import {
  pgTable,
  varchar,
  uuid,
  timestamp,
  pgSchema,
} from "drizzle-orm/pg-core";

export const ROLES = ["user", "admin"] as const;

const authSchema = pgSchema("auth");

export const authUsers = authSchema.table("users", {
  id: uuid("id").primaryKey(),
});

export const usersTable = pgTable("users", {
  id: uuid()
    .primaryKey()
    .references(() => authUsers.id, {
      onDelete: "cascade",
    }),
  first_name: varchar({ length: 255 }).notNull(),
  last_name: varchar({ length: 255 }).notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
  created_at: timestamp({ withTimezone: true }).defaultNow().notNull(),
  updated_at: timestamp({ withTimezone: true }).defaultNow().notNull(),
  password: varchar({ length: 255 }).notNull(),
  role: varchar("role", { enum: ROLES }).default("user").notNull(),
});

export const resumesTable = pgTable("resumes", {
  id: uuid("id")
    .default(sql`gen_random_uuid()`)
    .primaryKey(),
  user_id: uuid()
    .notNull()
    .references(() => usersTable.id, { onDelete: "cascade" }),
  content: varchar().notNull(),
  resume_url: varchar({ length: 255 }).notNull(),

  created_at: timestamp({ withTimezone: true }).defaultNow().notNull(),
  updated_at: timestamp({ withTimezone: true }).defaultNow().notNull(),
});
