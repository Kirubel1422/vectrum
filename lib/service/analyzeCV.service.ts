import { BUCKET_NAME } from "../constants";
import { storage, retrieve } from "../supabase/supabase.storage";
import path from "path";
import { cvContentParser } from "../utils/index";
import { googleGenAI } from "../utils/index";

export const AnalyzeServices = {
  async analyze(
    jobDescription: string,
    cv: File
  ): Promise<{ content: string; resumePath: string }> {
    // Upload CV to supabase
    const fileName = `${new Date().toISOString()}-${cv.name}`;
    const fileType = path.extname(cv.name);
    const fileBuffer = Buffer.from(await cv.arrayBuffer());

    const { error, path: supabaseCVPath } = await storage.upload({
      bucketName: BUCKET_NAME,
      fileBuffer,
      fileType,
      fileName,
    });

    if (error) {
      console.error("Error uploading CV to storage:", error);
      throw new Error("Failed to upload CV to storage");
    }

    // Parse contents of CV
    const parsedCVContent = await cvContentParser(fileType, fileBuffer);

    if (!parsedCVContent) throw new Error("Parsing CV content failed");

    // Prepare Content
    const content = JSON.stringify({
      job_description: jobDescription,
      cv_content: parsedCVContent,
    });

    const response = await googleGenAI(content);

    if (response != undefined) {
      return {
        content: JSON.parse(response),
        resumePath: retrieve(supabaseCVPath as string, BUCKET_NAME),
      };
    }

    throw Error("Failed to generate analysis");
  },
};
