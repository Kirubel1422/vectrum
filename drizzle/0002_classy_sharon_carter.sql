CREATE TYPE "public"."roles" AS ENUM('user', 'admin');--> statement-breakpoint
ALTER TABLE "resumes" ALTER COLUMN "id" SET DEFAULT '4181a528-1459-45bb-8bda-6054c55cf25a';--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "id" SET DEFAULT '46bbdbfd-9d99-490f-a576-e612a6532fee';