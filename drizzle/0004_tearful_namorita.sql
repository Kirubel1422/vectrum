ALTER TABLE "resumes" ALTER COLUMN "id" SET DEFAULT '794831fd-bfc1-4f46-a777-8776a6181f71';--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "id" SET DEFAULT gen_random_uuid();