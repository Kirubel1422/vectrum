import { db } from "@/db";
import { resumesTable } from "@/db/schema";

export const ResumeService = {
  async getAllResumes() {
    return (await db.select().from(resumesTable)).map((resume) => {
      //@ts-ignore
      delete resume.content;
      return resume;
    });
  },
};
