import { z } from "zod";

export const CVAnalysisSchema = z.object({
  cv: z
    .instanceof(File, { message: "Resume is required" })
    .refine((file) => file.size < 5 * 1024 * 1024, {
      message: "Resume must be smaller than 5MB",
    })
    .refine(
      (file) =>
        [
          "application/pdf",
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        ].includes(file.type),
      {
        message: "Resume must be a PDF or Word document",
      }
    ),

  jobDescription: z.string().min(50, {
    message: "Job description must be at least 50 characters long",
  }),
});

export type CVAnalysisSchemaType = z.infer<typeof CVAnalysisSchema>;
