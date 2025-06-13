import { pgTable, varchar, uuid, timestamp, pgEnum } from "drizzle-orm/pg-core";
import crypto from "node:crypto";

export const ROLES = pgEnum("roles", ["user", "admin"]);

export const authUsers = pgTable("auth.users", {
  id: uuid().primaryKey(),
});

export const usersTable = pgTable("users", {
  id: uuid()
    .primaryKey()
    .references(() => authUsers.id, { onDelete: "cascade" }),
  first_name: varchar({ length: 255 }).notNull(),
  last_name: varchar({ length: 255 }).notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
  created_at: timestamp({ withTimezone: true }).defaultNow().notNull(),
  updated_at: timestamp({ withTimezone: true }).defaultNow().notNull(),
  password: varchar({ length: 255 }).notNull(),
  role: ROLES("role").default("user").notNull(),
});

export const resumesTable = pgTable("resumes", {
  id: uuid().default(crypto.randomUUID()).primaryKey(),
  user_id: uuid()
    .notNull()
    .references(() => usersTable.id, { onDelete: "cascade" }),
  content: varchar().notNull(),
  resume_url: varchar({ length: 255 }).notNull(),

  created_at: timestamp({ withTimezone: true }).defaultNow().notNull(),
  updated_at: timestamp({ withTimezone: true }).defaultNow().notNull(),
});
